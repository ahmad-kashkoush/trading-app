const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const { Product, Subscription } = require('../Models/product');
async function resetSubscriptions() {
    try {
        // Clear existing subscriptions (truncate)
        console.log('Truncating subscriptions schema...');
        const deletedCount = await Product.deleteMany({ type: "subscription" });
        console.log(`Deleted ${deletedCount.deletedCount} existing subscription records`);

    } catch (error) {
        console.error('Error resetting subscriptions:', error);
    }
}
async function createSubscriptions() {
    try {

        // Create 3 subscription products
        const subscriptions = [
            {
                name: "Basic Trading Plan",
                price: 9.99,
                currency: "USD",
                type: "subscription",
                duration: 30,
                plan: "basic"
            },
            {
                name: "Premium Trading Plan",
                price: 29.99,
                currency: "USD",
                type: "subscription",
                duration: 30,
                plan: "premium"
            },
            {
                name: "Enterprise Trading Plan",
                price: 99.99,
                currency: "USD",
                type: "subscription",
                duration: 30,
                plan: "enterprise"
            }
        ];

        
        // Create new subscriptions
        console.log('Creating subscription products...');
        const createdSubscriptions = await Subscription.insertMany(subscriptions);

        console.log('Successfully created subscriptions:');
        createdSubscriptions.forEach((sub, index) => {
            console.log(`${index + 1}. ${sub.name} (${sub.plan}) - $${sub.price} for ${sub.duration} days`);
            console.log(`   ID: ${sub._id}`);
        });

        console.log('\nAll subscription products created successfully!');

    } catch (error) {
        console.error('Error creating subscriptions:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the script
mongoose.connect(process.env.URL).then(() => {
    resetSubscriptions().then(() => createSubscriptions());
});