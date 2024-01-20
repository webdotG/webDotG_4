const pool = require('../db');

const GetAll = async (req, res) => {
  try {

    const query = `
 SELECT 
   p.*, 
   u.name AS user_name, 
   u.email AS user_email 
 FROM 
   webdotg.posts AS p
 LEFT JOIN 
   webdotg.users AS u 
 ON 
   p.user_id::integer = u.id`
    // Выполнение запроса и получение результатов
    const { rows } = await pool.query(query);
    console.log('API/POSTS GETALL ROWS : ', rows)
    res.json(rows)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось получть все посты' });
  }
}

const GetOne = async (req, res) => {
  try {

    const postId = req.params.id

    // SQL-запрос для получения конкретного поста по его id
    const query = `
      SELECT *
      FROM webdotg.posts
      WHERE id = $1
    `;
    const { rows } = await pool.query(query, [postId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    // Вернуть первый найденный пост
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось получть конкретный пост' });
  }
}

const Create = async (req, res) => {
  try {

    const { title, text, tags } = req.body;
    const userId = req.userId;

    // Получение информации о пользователе по userId
    const userQuery = `
          SELECT name, email FROM webdotg.users WHERE id = $1;
          `;
    const userValues = [userId];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      throw new Error('Пользователь не найден');
    }

    const { name, email } = userResult.rows[0];

    // SQL запрос для вставки новой статьи в базу данных с информацией о пользователе
    const insertQuery = `
      INSERT INTO webdotg.posts (title, text, tags, user_id, created_at, updated_at, user_name, user_email)
      VALUES ($1, $2, $3, $4, NOW(), NOW(), $5, $6)
      RETURNING *;
    `;
    const values = [title, text, tags, userId, name, email];
    const result = await pool.query(insertQuery, values);
    // console.log('API/POSTS CREATE RESULT : ', result)
    
    // Проверяю успешность выполнения запроса и возвращаем созданную статью
    if (result.rows.length > 0) {
      const newPost = result.rows[0];
      res.status(201).json({ message: 'Пост успешно создан', post: newPost });
    } else {
      throw new Error('Не удалось создать пост');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось создать пост' });
  }
};

const Remove = async (req, res) => {
  try {
    const postId = req.params.id;

    // SQL-запрос для удаления конкретной записи по её id
    const deleteQuery = `
      DELETE FROM webdotg.posts
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await pool.query(deleteQuery, [postId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    res.json({ message: 'Пост успешно удален', deletedPost: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось удалить пост' });
  }
};

const Update = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, tags } = req.body;

    // SQL-запрос для обновления конкретной записи по ее id
    const updateQuery = `
      UPDATE webdotg.posts
      SET title = $1, text = $2, tags = $3
      WHERE id = $4
      RETURNING *
    `;

    const { rows } = await pool.query(updateQuery, [title, text, tags, postId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    res.json({ message: 'Пост успешно обновлен', updatedPost: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось обновить пост' });
  }
};

module.exports = { GetAll, GetOne, Create, Remove, Update };
