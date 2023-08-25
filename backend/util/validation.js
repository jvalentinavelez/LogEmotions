// Check if a text value is valid (not empty and meets minimum length requirement)
function isValidText(value, minLength = 1) {
    return value && value.trim().length >= minLength;
}

// Check if a given value is a valid date
function isValidDate(value) {
    const date = new Date(value);
    return value && date !== 'Invalid Date';
  }

// Check if a value is a valid email (contains '@')
function isValidEmail(value) {
    return value && value.includes('@');
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidEmail = isValidEmail;