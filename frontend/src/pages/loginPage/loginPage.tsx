import React, { useEffect, useState } from 'react';
import styles from './loginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { fetchLogin, selectIsAuth } from '../../slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const isValidPassword = (password: string): boolean => {
    return password.length >= 3;
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setError({
          ...error,
          [name]: value.trim() === '' ? 'обязательно для заполнения' : !emailRegex.test(value) ? 'некорректный email' : '',
        });
        break;
      case 'password':
        setError({ ...error, [name]: !isValidPassword(value) ? 'не менее 6 символов' : '' });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, values: { email: string, password: string }) => {
    console.log("LOGIN PAGE HANDLE SUBMIT VALUES ! ")
    e.preventDefault();
    if (!error.email && !error.password) {
      try {
        dispatch(fetchLogin(values))
        //проверка на промис 
        const data = await dispatch(fetchLogin(values))
        console.log("DISPATCH fetchLogin VALUES , PROMISE ! ")
        if (typeof data.payload === 'object' && data.payload !== null && 'token' in data.payload) {
          const token: string = data.payload.token as string;
          window.localStorage.setItem('token', token);
        } else {
          alert('Не авторизован');
        }
      } catch (error) {
        console.error('ОШИБКА ЗАПОЛНИ ФОРМУ : ', error);
      }
    }
    else {
      console.log('Форма невалидн заполните все поля корректно.');
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className={`${styles['login-form__title']} ${styles['page-container']}`} >
      <Header />
      <h2 className={styles['login-form-title']}>Войти</h2>
      
      <form className={styles['login-form']} onSubmit={(e) => handleSubmit(e, user)}>
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
        <div className={styles['password-wrapper']} >
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
        <button disabled={!!(error.email || error.password)} type="submit" className={styles['submit-button']}>Войти</button>
      </form>

<Link className={styles['to-register']} to='/register'><p>зарегистрироваться</p></Link>

      <Footer />
    </div>
  );
}

export default LoginPage;

