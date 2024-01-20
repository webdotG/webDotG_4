import style from './communismPage.module.scss'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Post from '../../components/Post/Post'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchPosts, fetchTags } from '../../slices/posts/postsSlice'
import { typeUserData } from '../../types'
import { Link } from 'react-router-dom'


export default function CommunismPage() {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(state => state.posts) //, tags
  console.log('COMMUNISM PAGE POSTS ! ')
  console.log('COMMUNISM PAGE TAGS ! ')
  const userData: typeUserData | null = useAppSelector((state) => state.auth.data)
  console.log('COMMUNISM PAGE USERDATA ! ');
  const isPostsLoading = posts.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <div className={style['page-container']}>
      <Header />
      <div className={style['communism-wrapper']}>
        <div className={style['communism-about-wrapper']}>
          <h1 className={style['communism-title']}>что такое Коммунизм 2.0 ?</h1>
          <p className={style['communism-about']}>
            Это шутеечное название доски объявлений
          </p>
          <p className={style['communism-about']}>
            Здесь можно предложить свои услуги
          </p>
          <p className={style['communism-about']}>
            Взамен получить другие услуги или обмен на необходимое
          </p>
        </div>
        <Link className={style['add-post-link']} to='/addPost'>
          написать пост
        </Link>
        <section className={style['communism']}>
          {(isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) =>
            //так как при рендере сперва будет фэковый массив из трёх undefined
            //а посты получаю позже запросу нужно время и сразу не получится взять данные из obj
            //надо сделать дополнительную проверку
            //и если грузятся 3 фейковых undefined то грузить скелетон но пока временно строку 
            //а если данные получены то уже рендерить нормальные посты
            isPostsLoading
              ? (<div key={index}>
                загрузка [ARRAY(3)]
              </div>)
              : (
                <div className={style['post-wrapper']} key={obj.id} >
                    <h2 className={style['post-title']} >{obj.title}</h2>
                  <Post
                    key={obj.id}
                    id={obj.id}
                    title={obj.title}
                    text={obj.text}
                    tags={obj.tags}
                    user_name={obj.user_name}
                    user_email={obj.user_email}
                    created_at={obj.created_at}
                    updated_at={obj.updated_at}
                    isEditable={userData?.email === obj.user_email}
                    confirmUser={userData?.email}
                  />
                  <Link className={style['link-to-post']} to={`/communism2.0/${obj.id}`}>
                    перейти к посту
                  </Link>
                </div>
              )
          )}
        </section>
      </div>
      <Footer />
    </div>
  )
}
