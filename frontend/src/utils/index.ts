// Function to save a token to cookies
function saveTokenToCookie(token, name = "userToken", days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${token};${expires};path=/;Secure;SameSite=Strict`;
}

// Function to get a token from cookies
function getTokenFromCookie(name = "authToken") {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

// Function to delete a token from cookies
function deleteTokenFromCookie(name = "authToken") {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure;SameSite=Strict`;
}

export { saveTokenToCookie, getTokenFromCookie, deleteTokenFromCookie };
