import {MContactsList} from '../conactsSocial/contactsSocial'
import React, { useState } from 'react';
import style from './mainOrder.module.scss';

interface typeErrorState { [key: string]: string; }

const validateInput = (value: string): boolean => value.trim().length >= 5;
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(phoneNumber);
};

const MainOrder: React.FC = () => {

  const [errors, setErrors] = useState<typeErrorState>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = event.target;
    setErrors({ ...errors, [id]: !validateInput(value) ? 'минимум 5 символов' : '' });
  };
  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setErrors({ ...errors, [id]: !validateEmail(value) ? 'не правильный email' : '' });
  };
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setErrors({ ...errors, [id]: !validatePhoneNumber(value) ? 'не правильный номер' : '' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputs = Array.from(form.querySelectorAll('input, textarea')) as (HTMLInputElement | HTMLTextAreaElement)[];

    let newErrors: typeErrorState = {};

    inputs.forEach((input) => {
      if (input.id === 'main-order__email-input') {
        newErrors = { ...newErrors, [input.id]: !validateEmail(input.value) ? 'не корректный email' : '' };
      } else if (input.id === 'main-order__tel-input') {
        newErrors = { ...newErrors, [input.id]: !validatePhoneNumber(input.value) ? 'не правильный номер телефона' : '' };
      } else {
        newErrors = { ...newErrors, [input.id]: !validateInput(input.value) ? 'минимум 5 символов' : '' };
      }
    });

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === '');
    setIsFormValid(isValid);
    if (isValid) {
      console.log('Форма отправлена');
    } else {
      console.log('Форма не отправлена. Пожалуйста, заполните все поля корректно.');
    }
  };

  return (
    <div className={style['main-order']}>
      <h2 className={style['main-order__title']}>сделать заказ</h2>
      <MContactsList />
      <h4 className={style['main-order__form-title']}>оставить заявку</h4>
      <form className={style['main-order__form']} onSubmit={handleSubmit}>
        <div className={style['main-order__input-wrapper']}>
          <label className={style['main-order__name-label']} htmlFor='main-order__name-input'>имя</label>
          <input
            type='text'
            id='main-order__name-input'
            className={style['main-order__name-input']}
            onChange={handleInputChange}
          />
          <span className={style['error-message']}>{errors['main-order__name-input']}</span>
        </div>
        <div className={style['main-order__input-wrapper']}>
          <label className={style['main-order__email-label']} htmlFor='main-order__email-input'>почта</label>
          <input
            type='email'
            id='main-order__email-input'
            className={style['main-order__email-input']}
            onChange={handleEmailInputChange}
          />
          <span className={style['error-message']}>{errors['main-order__email-input']}</span>
        </div>
        <div className={`${style['main-order__input-wrapper']} ${style['main-order__input-tel']}`}>
          <label className={style['main-order__tel-label']} htmlFor='main-order__tel-input'>телефон</label>
          <input
            type='tel'
            id='main-order__tel-input'
            className={style['main-order__tel-input']}
            onChange={handlePhoneNumberChange}
          />
          <span className={style['error-message']}>{errors['main-order__tel-input']}</span>
        </div>
        <div className={style['main-order__input-wrapper']}>
          <p className={style['main-order__comment-label']}>комментарий</p>
          <textarea className={style['main-order__comment-input']}
            id='main-order__comment-input'
            name="comment"
            cols={40}
            rows={3}
            onChange={handleInputChange}
          />
          <span className={style['error-message']}>{errors['main-order__comment-input']}</span>
        </div>
        <button className={style['main-order__btn-submit']} type='submit' disabled={!isFormValid}>
          отправить
        </button>
      </form>
    </div>
  );
};

export default MainOrder;
