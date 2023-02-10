const bcrypt = require('bcrypt');


async function verifyPassword(){
    const myPassword = 'admin123';
    const hash = '$2b$10$9ndSVdTXBW1KDx.KYFqEoOB700ZYiiCgJTn.0q9NzcMpw0HJqmU6u';
    const isMatch = await bcrypt.compare(myPassword,hash);
    console.log(isMatch);
}

verifyPassword();