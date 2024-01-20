import React, { useState } from 'react';
import styles from './registerPage.module.scss';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchRegister, selectIsAuth } from '../../slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function RegistrPage () {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()
  
  const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isValidPassword = (password: string): boolean => {
    return password.length >= 3;
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setError({ ...error, [name]: value.trim() === '' ? 'обязательно для заполнения' : '' });
        break;
      case 'email':
        setError({ ...error, [name]: !emailRegex.test(value) ? 'не корректный адрес почты' : '' });
        break;
      case 'password':
        setError({ ...error, [name]: !isValidPassword(value) ? 'не менее 6 символов' : '' });
        break;
      case 'confirmPassword':
        setError({ ...error, [name]: user.password !== value ? 'пароли не совпадают' : '' });
        break;
      default:
        break;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  };
  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    user: {
      email: string,
      password: string,
      confirmPassword: string,
      name: string
    },
  ) => {
    e.preventDefault();
  
    try {
      if (!error.email && !error.password && !error.confirmPassword && !error.name) {
        const data = await dispatch(fetchRegister(user));
        console.log("DISPATCH fetchREGISTER USER, PROMISE ??? ! ");
  
        if (data.payload !== null && typeof data.payload === 'object' && 'token' in data.payload) {

          const token: string = data.payload.token as string;
          window.localStorage.setItem('token', token);
          console.log('зарегался токен в локалсторадже');
        } else {
          console.error('нет токена из  response:', data);
          alert('Ошибка при получении токена регистрации!');
        }
      } else {
        console.log('Форма невалидна');
      }
    } catch (error) {
      console.error('ошибка данных регистрации на сервер!', error);
      alert('ошибка при отправке регистрации на сервер!');
    }
  };
  


  console.log('SELECT IS AUTH ! ')
  if (isAuth) {
    navigate('/')
  }


  return (
    <>
      <Header />
      <div className={`${styles['registration-form-container']} ${styles['page-container']}`}>
        <h2 className={styles['register-form-title']}>Форма регистрации</h2>
        <form className={styles['register-form']}
          onSubmit={(e) => handleSubmit(e, user)}>
          <div className={styles['email-wrapper']}>
            <label className={styles['email-label']}>
              Имя пользователя:
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${error.email ? styles.error : ''} ${styles['email-input']}`}
            />
            {error.name && <p className={styles['error-message']}>{error.name}</p>}
          </div>
          <div className={styles['email-wrapper']}>
            <label className={styles['email-label']}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${error.email ? styles.error : ''} ${styles['email-input']}`}
            />
            {error.email && <p className={styles['error-message']}>{error.email}</p>}
          </div>
          <div className={styles['password-wrapper']}>
            <label className={styles['password-label']}>
              Пароль:
            </label>
            <div className={styles['password-input_wrapper']}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${error.email ? styles.error : ''} ${styles['password-input']}`}
              />
              <button className={styles['btn-show-password']} type="button" onClick={handleTogglePassword}>
                {showPassword
                  ? (<svg fill="none" height="24" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.8162 11.3175L19.5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12.875V16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.18383 11.3175L4.5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>)
                  : (<svg
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 80 80"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Layer_2">
                      <g id="Layer_3">
                        <path
                          d="M40,5.4C20.9,5.4,5.4,20.9,5.4,40c0,19.1,15.5,34.6,34.5,34.6S74.5,59.1,74.6,40c0,0,0,0,0,0C74.5,20.9,59.1,5.5,40,5.4z M40,71.6C22.6,71.6,8.4,57.4,8.4,40C8.4,22.6,22.6,8.4,40,8.4S71.5,22.6,71.6,40c0,0,0,0,0,0C71.5,57.4,57.4,71.5,40,71.6z"
                        />
                        <path
                          d="M64.6,39.1c-9.6-13.7-28.4-17.1-42.1-7.5c-2.9,2-5.5,4.6-7.5,7.5L14.4,40l0.6,0.9c9.6,13.7,28.4,17.1,42.1,7.5c2.9-2,5.5-4.6,7.5-7.5l0.6-0.9L64.6,39.1z M39.8,50.8c-8.5,0-16.6-4-21.7-10.8c9.1-12,26.2-14.4,38.2-5.3c2,1.5,3.8,3.3,5.3,5.3C56.4,46.8,48.3,50.8,39.8,50.8z"
                        />
                        <path
                          d="M40.1,31.2c-4.9,0-8.8,3.9-8.8,8.8s3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8C48.8,35.2,44.9,31.3,40.1,31.2z M40.1,45.9c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8c3.2,0,5.8,2.6,5.8,5.8c0,0,0,0,0,0C45.8,43.3,43.3,45.9,40.1,45.9z"
                        />
                        <circle cx="40.1" cy="40" r="3.3" />
                      </g>
                    </g>
                  </svg>
                  )
                }
              </button>
            </div>
            {error.password && <p className={styles['error-message']}>{error.password}</p>}
          </div>
          <div className={styles['password-wrapper']}>
            <label className={styles['password-label']}>
              Подтверждение пароля:
            </label>
            <div className={styles['password-input_wrapper']}>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${error.email ? styles.error : ''} ${styles['password-input']}`}
              />
            </div>
            {error.confirmPassword && <p className={styles['error-message']}>{error.confirmPassword}</p>}
          </div>
          <button
            disabled={!!(error.email || error.password)}
            type="submit"
            className={styles['submit-button']}>
            Зарегистрироваться
          </button>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default RegistrPage;
