const bcrypt = require('bcrypt');

// Example function to hash a password
async function hashPassword(plainPassword) {
  try {
    const saltRounds = 10; // Higher number means more secure but slower
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Hashing failed');
  }
}

// Example function to compare a password during login
async function comparePassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Comparison failed');
  }
}

// Example usage
(async () => {
  const password = '12345';
  
  // Hash the password
  const hashed = await hashPassword(password);
  console.log('Hashed password:', hashed);

  // Compare the plain password to the hashed version
  const isMatch = await comparePassword('amepat3006', hashed);
  console.log('Password match:', isMatch);  // true if passwords match
})();
