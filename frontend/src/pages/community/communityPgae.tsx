import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import styles from './communityPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchAddUserCommunity, fetchAllUserCommunity, fetchRemoveUser, selectUsersCommunity } from '../../slices/community/communitySlice'
import { selectIsAdmin } from '../../slices/auth/authSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CommunityPgae() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const communityUsers = useAppSelector(selectUsersCommunity)
  const isAdmin = useAppSelector(selectIsAdmin);

  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value;
    setName(name);
  };

  const handleDateOfBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setDateOfBirth(dateValue);
  };

  const formattedDate = (date: Date | null): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleRemoveUser = (userId: number) => {
    if (isAdmin) {
      dispatch(fetchRemoveUser(userId))
    } else {
      alert('Вы не являетесь администратором и не можете удалять пользователей.');
    } 
    navigate('/confirm_remove_user')
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3) {
      alert('Имя должно содержать не менее 3 символов.');
      return;
    }
    if (dateOfBirth) {
      const currentDate = new Date();
      const birthDate = new Date(dateOfBirth);
      const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

      if (ageDifference < 18 || ageDifference > 65) {
        alert('Возраст должен быть от 18 до 65 лет.');
        return;
      }
    }

    // преобразование строки даты рождения в объект Date
    const dateOfBirthDate = dateOfBirth ? new Date(dateOfBirth) : null;
    // преобразование объекта Date в строку в нужном формате
    const formattedDateOfBirth = formattedDate(dateOfBirthDate);

    dispatch(fetchAddUserCommunity({ name, dateOfBirth: formattedDateOfBirth }))
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error adding user community:', error);
    });

  };

  useEffect(() => {
    dispatch(fetchAllUserCommunity())
  }, [])

  return (
    <div className={styles['page-container']}>
      <Header />
      <div className={styles['community']}>
        <h1 className={styles['community-title']}></h1>
        <form className={styles['form-add-user']}
          onSubmit={handleSubmit}
        >

          <label className={styles['community-label']}>
            <span className={styles['community-label-text']}>
              имя
            </span>
            <input className={styles['name-input']}
              type='text'
              placeholder='имя'
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className={styles['community-label']}>
            <span className={styles['community-label-text']}>
              дата рождения :
            </span>
            <span className={styles['community-label-date']}>
              (месяц.день.год)
            </span>
            <input className={styles['name-input-date']}
              type='date'
              onChange={handleDateOfBirthChange}
            />
          </label>

          <button className={styles['add-user']}
            type='submit'
          >
            пердложить кандидата
          </button>

        </form>
        <h2 className={styles['community-candidates-title']}>в очереди на вступление :</h2>
        <ul className={styles['candidates-list']}>

          {communityUsers.map((user, index) => (
            <li key={index} className={styles['candidates-item']}>
              <p className={styles['candidates-id']}>
                id заявки : <span className={styles['canditate-data']}>{user.id}</span>
              </p>
              <p className={styles['candidates-name']}>
                имя : <span className={styles['canditate-data']}>{user.name}</span>
              </p>
              <p className={styles['candidates-date-birthday']}>
                дата рождения : <span className={styles['canditate-data']}>{user.date_of_birth}</span>
              </p>
              <p className={styles['candidates-who-add']}>
                пригласил : <span className={styles['canditate-data']}>{user.created_by_user_name}</span>
              </p>
              <button
                className={`${styles['remove-user']} ${!isAdmin ? styles['display-none'] : ''}`}
                onClick={() => user.id !== null && handleRemoveUser(user.id)}
                disabled={!isAdmin || user.id === null}
              >
                Удалить пользователя
              </button>
            </li>
          ))}

        </ul>
      </div>
      <Footer />
    </div>
  )
}
