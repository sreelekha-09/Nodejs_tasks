const db = require('./db');

module.exports = function validate(username, password) {
  const result = db.filter(entry => {
    return entry.username === username && entry.password === password;
  });

  if (result.length !== 1) {
    return false;
  }

  return true;
}