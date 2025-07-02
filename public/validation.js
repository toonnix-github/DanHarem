(function(global){
  function validateRegistration(username, email, password) {
    let error = '';
    if (!username) {
      error = 'Username is required.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      error = 'Username can only contain letters, numbers, and underscores.';
    } else if (!email) {
      error = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      error = 'Enter a valid email address.';
    } else if (!password) {
      error = 'Password is required.';
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters.';
    }
    return error;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateRegistration };
  } else {
    global.validateRegistration = validateRegistration;
  }
})(typeof window !== 'undefined' ? window : global);
