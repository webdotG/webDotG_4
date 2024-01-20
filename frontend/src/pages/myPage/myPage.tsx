import style from './myPage.module.scss';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { selectUserName } from '../../slices/auth/authSlice';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

function MyPage() {

  const userName = useAppSelector(selectUserName)

  return (
    <div className={style['page-container']}>
      <Header />
      <div className={style['mypage-wrapper']}>
        <h2 className={style['hello']}>Здравствуй
          <p className={style['user-name']}>{userName}</p>
        </h2>
        <div className={style['community-link-wrapper']}>
        <Link className={style['community-link']}
            to="/community_no_verified">
            orgy band
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
