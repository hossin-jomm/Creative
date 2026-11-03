// يطبع هاش bcrypt لكلمة مرور لوضعه في ADMIN_PASSWORD_HASH
// الاستخدام: npm run hash-password -- "كلمة المرور"
const bcrypt = require('bcryptjs')

const password = process.argv[2]
if (!password || password.length < 12) {
  console.error('اكتب كلمة مرور من 12 حرفاً على الأقل: npm run hash-password -- "..."')
  process.exit(1)
}
console.log(bcrypt.hashSync(password, 12))
