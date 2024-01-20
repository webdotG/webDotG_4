import style from './fullPost.module.scss'
import Post from '../../components/Post/Post'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { typeUserData } from '../../types'
import { useAppSelector } from '../../hooks'
import axios from '../../axios'
import { PostData } from '../../types'


export default function FullPost() {
  const { id } = useParams()
  console.log('FULL POST USEPARAMS PARAMS ! ')
  const [postData, setPostData] = useState<PostData>({ id: 0, title: '', text: '', tags: '', user_name: '', user_email: '', created_at: '', updated_at: '', });
  console.log('FULLPOST SETDATAPOST POSTDATA ! ')
  const userData: typeUserData | null = useAppSelector((state) => state.auth.data)
  console.log('COMMUNISM PAGE USERDATA  ');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    axios.get(`/api/posts/${id}`)
      .then(res => {
        console.log('FULLPOST AXIOS GET /POSTS/:ID RES.DATA ! ')
        setPostData(res.data)
      })
      .catch((err) => {
        console.log('ошибка при попытке получения конкретной статьи')
        console.warn(err)
        alert('ошибка при попытке получения конкретной статьи')
      })
  }, [])

  return (
    <div className={style['page-container']}>
      <Header />
      <Link className={style['back-to-allpost']} to='/communism2.0'>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#00ADB5" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z" />
        </svg>
        обратно к постам
      </Link>

      <div className={style['full-post-content']}>
        <h1 className={style['full-post-title']}>{postData.title}</h1>

        <p className={style['full-post-text']}>
          {postData.text && postData.text.length >= 3
            ? (postData.text)
            : (
              <code className={style['full-post-text-error']}>
                {postData.user_name}<br/>
                'не написал текст'<br/>
                'ай ай ай'
              </code>
            )}
        </p>

        <p className={style['full-post-tags']}># {postData.tags}</p>
        <section className={style['post-data']}>
          <Post
            id={postData.id}
            title={postData.title}
            text={postData.text}
            tags={postData.tags}
            user_name={postData.user_name}
            user_email={postData.user_email}
            created_at={postData.created_at}
            updated_at={postData.updated_at}
            isEditable
            confirmUser={userData?.email}
          >
          </Post>
        </section>
      </div>


      <Footer />
    </div>
  )
}
