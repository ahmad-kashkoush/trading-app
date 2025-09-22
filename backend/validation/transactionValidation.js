const { check, body } = require("express-validator");
const ValidationMiddleware = require("../middleware/validationMiddleware");
const User = require("../Models/user");
const Product = require("../Models/product");
const { PAYMENT_LIMITS, CURRENCIES, TRANSACTION_STATUS } = require("../utils/constants");

const validateAmount = (required = true) => {
  let validator = check("amount");
  
  if (required) {
    validator = validator.notEmpty().withMessage("Amount is required");
  } else {
    validator = validator.optional();
  }
  
  return validator
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((amount) => {
      if (amount) {
        const numAmount = parseFloat(amount);
        if (numAmount < PAYMENT_LIMITS.MIN_AMOUNT) {
          throw new Error(`Minimum amount is $${PAYMENT_LIMITS.MIN_AMOUNT / 100}`);
        }
        if (numAmount > PAYMENT_LIMITS.MAX_AMOUNT) {
          throw new Error(`Maximum amount is $${PAYMENT_LIMITS.MAX_AMOUNT / 100}`);
        }
      }
      return true;
    });
};

const validateStatus = (required = true) => {
  let validator = check("status");
  
  if (required) {
    validator = validator.notEmpty().withMessage("Status is required");
  } else {
    validator = validator.optional();
  }
  
  return validator
    .isIn(Object.values(TRANSACTION_STATUS))
    .withMessage("Invalid transaction status");
};

/**
 * Date validation helper
 * @param {string} fieldName - Name of the date field
 * @param {boolean} required - Whether the field is required
 * @param {boolean} preventPast - Whether to prevent past dates
 * @returns {Object} Express validator chain
 */
const validateDate = (fieldName, required = true, preventPast = false) => {
  let validator = body(fieldName);
  
  if (required) {
    validator = validator.notEmpty().withMessage(`${fieldName} is required`);
  } else {
    validator = validator.optional();
  }
  
  validator = validator
    .isISO8601()
    .withMessage(`${fieldName} must be a valid date`);
  
  if (preventPast) {
    validator = validator.custom((dateValue) => {
      if (dateValue && new Date(dateValue) < new Date()) {
        throw new Error(`${fieldName} cannot be in the past`);
      }
      return true;
    });
  }
  
  return validator;
};

/**
 * Date range validation helper
 * @param {string} startFieldName - Name of the start date field
 * @param {string} endFieldName - Name of the end date field
 * @returns {Object} Express validator chain for end date
 */
const validateDateRange = (startFieldName, endFieldName) => {
  return body(endFieldName).custom((endDate, { req }) => {
    const startDateValue = req.body[startFieldName] || req.query[startFieldName];
    if (endDate && startDateValue) {
      const startDate = new Date(startDateValue);
      const end = new Date(endDate);
      if (end <= startDate) {
        throw new Error(`${endFieldName} must be after ${startFieldName}`);
      }
    }
    return true;
  });
};

// Create Transaction Validation
exports.CreateTransactionValidation = [
  // User ID validation
  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID format")
    .custom(async (userId) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.active) {
        throw new Error("User account is not active");
      }
      return true;
    }),

  // Email validation (enhanced regex)
  check("customerEmail")
    .notEmpty()
    .withMessage("Customer email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Email format is invalid")
    .normalizeEmail()
    .toLowerCase(),

  // Product validation - now uses productId instead of productName
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID format")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      if (!product.isActive) {
        throw new Error("Product is not available");
      }
      return true;
    }),

  // Amount validation using helper
  validateAmount(true),

  // Currency validation
  check("currency")
    .optional()
    .isIn(Object.values(CURRENCIES))
    .withMessage(`Currency must be one of: ${Object.values(CURRENCIES).join(", ")}`),

  // Stripe session ID validation
  check("stripeSessionId")
    .notEmpty()
    .withMessage("Stripe session ID is required")
    .isLength({ min: 10 })
    .withMessage("Invalid Stripe session ID format"),

  // Access period validation
  check("accessPeriodDays")
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage("Access period must be between 1 and 365 days"),

  // Date validation using helpers
  validateDate("accessStartDate", false, true),
  validateDate("accessEndDate", false),
  validateDateRange("accessStartDate", "accessEndDate"),

  ValidationMiddleware,
];

// Update Transaction Validation
exports.UpdateTransactionValidation = [
  // Transaction ID validation
  check("id")
    .isMongoId()
    .withMessage("Invalid transaction ID format"),

  // Status validation using helper
  validateStatus(false),

  // Amount validation using helper (optional for updates)
  validateAmount(false),

  // Date validation using helpers
  validateDate("accessStartDate", false),
  validateDate("accessEndDate", false),
  validateDateRange("accessStartDate", "accessEndDate"),

  ValidationMiddleware,
];

// Query/Search Transaction Validation
exports.QueryTransactionValidation = [
  // User ID for filtering
  check("userId")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID format"),

  // Status validation using helper
  validateStatus(false),

  // Date range validation using helpers
  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  // Custom validation for date range in query context
  check("endDate").custom((endDate, { req }) => {
    if (endDate && req.query.startDate) {
      const start = new Date(req.query.startDate);
      const end = new Date(endDate);
      if (end <= start) {
        throw new Error("End date must be after start date");
      }
    }
    return true;
  }),

  // Pagination
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  check("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  ValidationMiddleware,
];
