const jwt = require('jsonwebtoken');
const pool = require('../db'); // Подключение к базе данных с помощью pool

const Auth = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    // console.log('MIDLEWEAR AUTH TOKEN : ', token);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('MIDLEWEAR AUTH DECODED JWT : ', decoded);
    } catch (decodeErr) {
      if (decodeErr.name === 'TokenExpiredError') {
        // console.error('TOKEN EXPIRED : ', decodeErr.message);
        throw new Error('Срок действия токена истек');
      } else {
        // console.error('ERROR DECODING TOKEN : ', decodeErr.message);
        throw new Error('Ошибка декодирования токена');
      }
    }

    const userId = decoded.id;
    console.log('MIDLEWEAR AUTH USER ID : ', userId);

    // запрос на проверку в таблице users и в таблице admins
    const getUserQuery = `
  (SELECT id, email, name, password FROM webdotg.users WHERE id = $1)
  UNION
  (SELECT id, email, name, password FROM webdotg.admins WHERE id = $1)
`;
    // console.log('MIDLEWEAR AUTH GET USER QUERY : ', getUserQuery);

    const userResult = await pool.query(getUserQuery, [userId]);
    // console.log('MIDLEWEAR AUTH USER RESULT : ', userResult);

    if (userResult.rows.length === 0) {
      throw new Error('Пользователь не найден');
    }

    // запрос на проверку в таблице admins
    const checkAdminQuery = 'SELECT * FROM webdotg.admins WHERE email = $1';
    const checkAdminValues = [userResult.rows[0].email];
    // console.log('MIDLEWEAR AUTH CHECK ADMIN QUERY : ', checkAdminQuery);

    const adminResult = await pool.query(checkAdminQuery, checkAdminValues);
    // console.log('MIDLEWEAR AUTH ADMIN RESULT : ', adminResult);

    req.userId = userId;
    req.user = {
      ...userResult.rows[0],
      isAdmin: adminResult.rows.length > 0, // Если есть запись в admins, то устанавливаем флаг
    };

    next();
  } catch (err) {
    console.error('MIDLEWEAR AUTH ERROR : ', err.message);
    res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports = Auth;
