const pool = require('../db');

const MakeOrder = async (userId, selectedItems) => {
  try {
    const createOrderQuery = 'INSERT INTO orders (user_id, items) VALUES ($1, $2) RETURNING *';
    const order = await pool.query(createOrderQuery, [userId, JSON.stringify(selectedItems)]);
    
    return order.rows[0]; // Возвращаю созданный заказ

  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    throw new Error('Ошибка при создании заказа');
  }
};

module.exports = {
  MakeOrder
};
