const bcrypt = require('bcryptjs'); // or 'bcryptjs' if you installed that

const plainPassword = 'admin@123';

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log('Hashed Password:', hash);
}).catch((err) => {
  console.error('Error hashing password:', err);
});
