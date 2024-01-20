const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');


const Register = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !password || !name || !confirmPassword) {
    return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM webdotg.users WHERE email = $1';
    const existingUser = await pool.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь  с таким email уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = 'INSERT INTO webdotg.users (name, email, password, confirmPassword) VALUES ($1, $2, $3, $4) RETURNING *';
    const newUser = await pool.query(createUserQuery, [name, email, hashedPassword, confirmPassword]);

    const secret = process.env.JWT_SECRET;
    if (newUser.rows.length > 0 && secret) {
      const user = newUser.rows[0];
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        confirmPassword: user.confirmPassword,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
      });
    } else {
      res.status(400).json({ message: 'Не удалось создать пользователя' });
    }

    return res;

  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


const Login = async (req, res) => {
  const { email, password } = req.body;

  // проверка наличия email и password в запросе
  if (!email || !password) {
    return res.status(400).json({ message: 'Пожалуйста, заполните поля, они обязательны' });
  }

  try {
    // запрос на получение пользователя из таблицы users
    const userQuery = 'SELECT * FROM webdotg.users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    // запрос на получение администратора из таблицы admins
    const adminQuery = 'SELECT * FROM webdotg.admins WHERE email = $1';
    const adminResult = await pool.query(adminQuery, [email]);

    let user; // переменная для хранения данных пользователя
    // получение секретного ключа для JWT 
    const secret = process.env.JWT_SECRET;

    // если пользователь не найден в таблице users, проверяю таблицу admins
    if (userResult.rows.length === 0 && adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];
      // проверяю хешированный пароль администратора
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (isPasswordCorrect) {
        // устанавливаю флаг isAdmin в true, так как пользователь является администратором
        return res.status(200).json({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          isAdmin: true,
          token: jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
        });
      } else {
        // если пароль администратора неверен, возвращаю ошибку
        return res.status(400).json({ message: 'Неверный логин или пароль' });
      }
    } else if (userResult.rows.length > 0) {
      // если пользователь найден в таблице users, использую его данные
      user = userResult.rows[0];
      // устанавливаю флаг isAdmin в false, так как пользователь не является администратором
      user.isAdmin = false;
    } else {
      // Если пользователь не найден в обеих таблицах, возвращаем ошибку
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    // проверка правильности пароля для пользователей, не являющихся администраторами
    if (!user.isAdmin) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Неверный логин или пароль' });
      }
    }


    // генерация токена и возвращение успешного ответа
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: false,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
    });
  } catch (error) {
    // обработка ошибок при выполнении запроса
    console.error('Ошибка при входе:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


const Current = async (req, res) => {
  return res.status(200).json(req.user)
};


module.exports = {
  Register,
  Login,
  Current,
};
