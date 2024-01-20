const pool = require('../db');

const GetTags = async (req, res) => {
  
  try {

    // SQL-запрос для выборки всех тегов из всех постов
    const query = `
   SELECT DISTINCT tags
   FROM webdotg.posts
 `;

    // Выполнение запроса и получение результатов
    const { rows } = await pool.query(query);

    // Извлечение всех тегов из полученных результатов
    const tags = rows.map(row => row.tags).filter(tag => tag !== null); // Фильтруем null значения

    res.json(tags)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось получть тэги' });
  }
}

module.exports = { GetTags };