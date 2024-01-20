import style from './confirmationRemoveUser.module.scss'
import { useAppSelector } from '../../hooks'
import { selectRemoveUserCommunity } from '../../slices/community/communitySlice'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { Link } from 'react-router-dom'

export default function ConfirmationRemoveUser() {

  const removedUser = useAppSelector(selectRemoveUserCommunity)
  console.log('removedUser')
  return (
    <div className={style['page-container']}>
      <Header />
      <Link className={style['back-link']} to='/community_no_verified'>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#00ADB5" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z" />
        </svg>
        обратно к заявкам
      </Link>
      <div className={style['remove-user']}>
        <h2 className={style['remove-user-title']}>пользователь удалён</h2>
        {removedUser && (
          <div className={style['candidates-item']}>
            <p className={style['removed-user-info']}>
              ID заявки: <span>{removedUser.id}</span>
            </p>
            <p className={style['removed-user-info']}>
              имя: <span>{removedUser.name}</span>
            </p>
            <p className={style['removed-user-info']}>
              дата рождения: <span>{removedUser.date_of_birth}</span>
            </p>

            <p className={style['removed-user-info']}>
              приглашён пользователем: <span>{removedUser.created_by_user_name}</span>
            </p>
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}
