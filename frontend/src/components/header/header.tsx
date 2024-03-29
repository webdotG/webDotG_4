import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './header.module.scss'
import LogoG from '../../svg/logoG';
import { logOut, selectIsAuth } from '../../slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';


export default function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [onClickBtn, setOnCliclBtn] = useState(false)
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    function handleResize() {
      setOnCliclBtn(window.innerWidth >= 780);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onClickLogOut = () => {
    if (window.confirm('уверен что надо ? ')) {
      dispatch(logOut())
      window.localStorage.removeItem('token')
    }
    navigate('/login')
  }

  return (
    <header className={style.header}>

      <section className={style.header_logo__wrapper}>
        <Link className={style.header_logo} to="/">
          <LogoG />
        </Link>
        <button
          onClick={() => setOnCliclBtn(!onClickBtn)}
          className={style.burger_btn}
        >
          {onClickBtn
            ? (<span>закрыть</span>)
            : (<span>меню</span>)
          }

        </button>
      </section>
      <div className={onClickBtn ? style.nav__wrapper : style.display_none}>
        <nav className={style.header_navigation}>
          <ul className={style.header_nav_list}>
            <li className={style.header_nav__item}>
              <Link className={style.header_nav__link} to="/portfolio">
                портфолио
              </Link>
            </li>
            <li className={style.header_nav__item}>
              <Link className={style.header_nav__link} to="/shop">
                магазин
              </Link>
            </li>
            <li className={style.header_nav__item}>
              <Link className={style.header_nav__link} to="/cart">
                корзина
              </Link>
            </li>
            <li className={style.header_nav__item}>
              <Link className={style.header_nav__link} to="/communism2.0">
                коммунизм 2.0
              </Link>
            </li>

            <li className={style.header_nav__item}>
              {!isAuth
                ? (<Link className={style.header_nav__link}
                  to="/login">
                  войти
                </Link>)
                : (null)
              }
            </li>

            <li className={style.header_nav__item}>
              {!isAuth
                ? (<Link className={style.header_nav__link} to="/register">
                  регистрация
                </Link>)
                : (null)
              }
            </li>

          </ul>
        </nav>
      </div>

      {isAuth &&
        <div className={style.auth_wrapper}>
          <Link className={style.check_auth_link} to='/myPage'>
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#00ADB5" strokeLinecap="round" strokeLinejoin="round" d="M13 9H18M13 11H16M10.5 9.5C10.5 10.3284 9.82843 11 9 11C8.17157 11 7.5 10.3284 7.5 9.5C7.5 8.67157 8.17157 8 9 8C9.82843 8 10.5 8.67157 10.5 9.5ZM7.65882 13H10.3412C10.5824 13 10.7031 13 10.811 13.0154C11.1844 13.0685 11.5074 13.2554 11.6883 13.523C11.7405 13.6003 11.7787 13.6922 11.855 13.8759C11.9467 14.0967 11.9925 14.2071 11.9987 14.2961C12.0206 14.6103 11.7659 14.8939 11.3878 14.9766C11.2806 15 11.1357 15 10.8458 15H7.15422C6.86432 15 6.71937 15 6.61221 14.9766C6.23409 14.8939 5.97944 14.6103 6.00131 14.2961C6.0075 14.2071 6.05334 14.0967 6.14502 13.8759C6.22131 13.6922 6.25945 13.6003 6.31173 13.523C6.49265 13.2554 6.81558 13.0685 7.18903 13.0154C7.29693 13 7.41756 13 7.65882 13ZM6 17H18C18.9428 17 19.4142 17 19.7071 16.7071C20 16.4142 20 15.9428 20 15V8C20 7.05719 20 6.58579 19.7071 6.29289C19.4142 6 18.9428 6 18 6H6C5.05719 6 4.58579 6 4.29289 6.29289C4 6.58579 4 7.05719 4 8V15C4 15.9428 4 16.4142 4.29289 16.7071C4.58579 17 5.05719 17 6 17Z" />
            </svg>
            кабинет
          </Link>
          <button className={style['btn-logout']}
            onClick={onClickLogOut}>выйти</button>
        </div>
      }

      <div>
      </div>
    </header>
  )
}


