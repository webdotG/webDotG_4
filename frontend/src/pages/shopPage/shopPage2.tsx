import React from 'react';
import style from './shopPage.module.scss';

interface Item {
  id: number;
  name: string;
  price: number;
  block: string;
}

const ShopPage: React.FC = () => {
  const testObj: Item[] = [
    { id: 1, name: "Шаблон", price: 1, block: 'first' },
    { id: 2, name: "Индивидуальный", price: 2, block: 'first' },

    { id: 3, name: "Сайты", price: 3, block: 'seconde' },
    { id: 4, name: "Телеграм Бот", price: 4, block: 'seconde' },
    { id: 5, name: "Приложения", price: 5, block: 'seconde' },

    { id: 6, name: 'Лендинг', price: 6, block: 'third' },
    { id: 7, name: 'Многостраничный', price: 8, block: 'third' },
    { id: 8, name: 'Магазин', price: 9, block: 'third' },

    { id: 9, name: 'ЧатБот', price: 10, block: 'fourth' },
    { id: 10, name: 'Магазин Бот', price: 11, block: 'fourth' },

    { id: 12, name: 'IOS & Andriod', price: 12, block: 'sixsth' },
    { id: 13, name: 'VK App', price: 13, block: 'sixsth' },

    { id: 14, name: 'Иллюстрации', price: 14, block: 'seventh' },
    { id: 15, name: 'Иконки', price: 15, block: 'seventh' },
    { id: 16, name: 'Фотографии', price: 16, block: 'seventh' },
    { id: 17, name: 'Срочно!', price: 17, block: 'seventh' },
  ];

  // Группируем объекты по полю "block"
  const groupedByBlock: { [key: string]: Item[] } = {};

  testObj.forEach(item => {
    if (!groupedByBlock[item.block]) {
      groupedByBlock[item.block] = [];
    }
    groupedByBlock[item.block].push(item);
  });

  const renderBlocks = Object.keys(groupedByBlock).map(block => {
    const itemsInBlock = groupedByBlock[block].map(item => (
      <span className={`${style[block + '-block--wrapper']}`} key={item.id}>
        <label>
          <input
            className={style['radio']}
            id={`${item.id}`}
            type='radio'
            name={`${block}-radio`}
          />
          <span className={style['custom-check']}></span>
          {`${item.name} - ${item.price}`}
        </label>
      </span>
    ));
    return (

      <div key={block}>
        {itemsInBlock}
      </div>
    );

  });

  // Объединяем HTML для каждой группы в общий блок
  const renderedHTML = (
    <div>
      {renderBlocks}
    </div>
  );

  // Возвращаем сгенерированный HTML
  return renderedHTML;
};

export default ShopPage;
