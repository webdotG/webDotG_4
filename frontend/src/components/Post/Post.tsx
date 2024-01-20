import { Link, useNavigate } from 'react-router-dom';
import style from './post.module.scss';
import { useAppDispatch } from '../../hooks';
import { fetchRemovePost } from '../../slices/posts/postsSlice';

interface PostProps {
  id: number | undefined,
  title: string | undefined,
  text: string | undefined,
  tags: string | null | undefined,
  user_name: string | undefined,
  user_email: string | undefined,
  created_at: string | undefined,
  updated_at: string | undefined,
  isEditable: boolean,
  confirmUser: string | undefined
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  text,
  tags,
  user_name,
  user_email,
  created_at,
  updated_at,
  isEditable,
  confirmUser
}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickRemove = () => {
    if (window.confirm('Удалить пост?') && id !== undefined) {
      dispatch(fetchRemovePost(id))
      navigate('/removePost')
    }
  }

  console.log('confirmUser ! ')
  console.log('user_email ! ')
  const canEditOrDelete = confirmUser === user_email;

  let dateOnly: string | undefined;
  if (updated_at) {
    dateOnly = updated_at.split(' ')[0];
  }

  return (
    <div className={style.post}>
      <section className={style['post-data']}>
        <p className={style['display-none']}>ID: {id}</p>
        <p className={style['display-none']}>Title: {title}</p>
        <p className={style['display-none']}>Text: {text}</p>
        <p className={style['display-none']}>Tags: {tags}</p>
        <p className={style['user-name']}>{user_name}</p>
        <p className={style['display-none']}>{user_email}</p>
        <p className={style['display-none']}>{created_at}</p>
        <p className={style['update-at']}>{dateOnly} </p>
        
      </section>
      {canEditOrDelete && isEditable && (
        <div className={style['control-buttons']}>
          <Link className={style['edit-link']}
            to={`/communism2.0/${id}/edit`}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#00ADB5" d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H9M15 5H17C18.1046 5 19 5.89543 19 7V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path stroke="#00ADB5" d="M14.902 20.3343L12.7153 20.7716L13.1526 18.585C13.1914 18.3914 13.2865 18.2136 13.4261 18.074L17.5 14L19.5 12L21.4869 13.9869L19.4W869 15.9869L15.413 20.0608C15.2734 20.2004 15.0956 20.2956 14.902 20.3343Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path stroke="#00ADB5" d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            редактировать
          </Link>
          <button className={style['remove-btn']}
            onClick={onClickRemove} >
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#00ADB5" d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path stroke="#00ADB5" d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H10M15 5H17C18.1046 5 19 5.89543 19 7V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path stroke="#00ADB5" d="M14 16L16.5 18.5M19 21L16.5 18.5M16.5 18.5L19 16M16.5 18.5L14 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            удалить
          </button>
        </div>
      )}
    </div >
  );
};

export default Post;
