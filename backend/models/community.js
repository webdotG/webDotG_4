const pool = require('../db');


const AddUser = async (req, res) => {
  try {
    const { name, dateOfBirth } = req.body;
    const createdByUserId = req.userId;
    // Получение информации о пользователе по createdByUserId
    const createdByUserQuery = `
      SELECT name as created_by_user_name FROM webdotg.users WHERE id = $1;
    `;
    const createdByUserValues = [createdByUserId];
    const createdByUserResult = await pool.query(createdByUserQuery, createdByUserValues);

    if (createdByUserResult.rows.length === 0) {
      throw new Error('Пользователь, создавший нового пользователя, не найден');
    }

    const createdByUserName = createdByUserResult.rows[0].created_by_user_name;

    // SQL запрос для вставки нового пользователя в базу данных
    const insertUserQuery = `
      INSERT INTO webdotg.community (name, date_of_birth, created_by_user_id, created_by_user_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, dateOfBirth, createdByUserId, createdByUserName];
    const result = await pool.query(insertUserQuery, values);

    // Проверка успешности выполнения запроса и возвращение созданного пользователя
    if (result.rows.length > 0) {
      const newUser = result.rows[0];
      res.status(201).json({ message: 'Пользователь успешно создан', user: newUser });
    } else {
      throw new Error('Не удалось создать пользователя');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось создать пользователя' });
  }
};


const GetAllUsers = async (req, res) => {
  try {
    const getAllUsersQuery = `
    SELECT c.*, u.name AS created_by_user_name
    FROM webdotg.community c
    LEFT JOIN webdotg.users u ON c.created_by_user_id::integer = u.id;
    `;
  
    const allUsers = await pool.query(getAllUsersQuery);
  
    // проверка выполнения запроса и возвращение списка пользователей
    if (allUsers.rows.length > 0) {
      const usersList = allUsers.rows;
      res.status(200).json({ message: 'Список пользователей успешно получен', users: usersList });
    } else {
      res.status(404).json({ message: 'Пользователи не найдены' });
    }
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


const RemoveUser = async (req, res) => {
  try {
    // Получение идентификатора пользователя из запроса
    const userId = req.params.userId; 

    // Проверка наличия идентификатора пользователя
    if (!userId) {
      return res.status(400).json({ message: 'Идентификатор пользователя не предоставлен' });
    }

    // SQL-запрос для получения информации об удаляемом пользователе
    const getUserQuery = `
      SELECT * FROM webdotg.community
      WHERE id = $1
    `;

    // Получение данных пользователя перед удалением
    const userBeforeRemoval = await pool.query(getUserQuery, [userId]);

    // SQL-запрос для удаления пользователя
    const removeUserQuery = `
      DELETE FROM webdotg.community
      WHERE id = $1
    `;

    await pool.query(removeUserQuery, [userId]);

    // Возвращение успешного ответа вместе с информацией об удаленном пользователе
    res.status(200).json({
      message: 'Пользователь успешно удален',
      removedUser: userBeforeRemoval.rows[0], // Первый (и единственный) результат запроса
    });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};




module.exports = { AddUser, GetAllUsers, RemoveUser };