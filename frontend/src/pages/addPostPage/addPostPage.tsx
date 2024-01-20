import style from './addPost.module.scss'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectIsAuth } from '../../slices/auth/authSlice'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import axios from '../../axios'

interface PostFields {
  title: string,
  text: string,
  tags: [''] | string,
  noFormatTags?: ['']
}

export default function AddPostPage(): JSX.Element {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [noFormatTags, setNoFormatTags] = useState('')
  // console.log('ADD POST FIELDS TITLE TEXT TAGS ! ')
  const [errorTitleMessage, setErrorTitleMesage] = useState('')
  const [errorTagsMessage, setErrorTagsMesage] = useState('')

  const MIN_TITLE_LENGTH = 5;
  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    if (inputValue.length < MIN_TITLE_LENGTH) {
      setErrorTitleMesage('Минимальная длина текста должна быть не менее 5 символов!')
    } else {
      setErrorTitleMesage('')
    }
    setTitle(inputValue);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const inputTags = e.target.value;
    setNoFormatTags(inputTags);
    const tagsValidateArray = noFormatTags.split(',').map(tag => tag.trim());
    const TAG_REGEX = /^#[A-Za-zА-Яа-я]{3,}$/;
    const isValid = tagsValidateArray.every(tag => TAG_REGEX.test(tag));
    if (!isValid) {
      setErrorTagsMesage('Теги должны начинаться с # и состоять минимум из трех символов');
    } else {
      setErrorTagsMesage('');
    }
    //обрезание и подготовка к отправке на сервер
    const tagsArray = noFormatTags.split('#').filter(tag => tag.trim() !== '');
    const formattedTags = tagsArray.map((tag) => {
      const trimmedTag = tag.trim();
      return `${trimmedTag}`;
    });
    // Преобразовываю массив строк в одну строку через запятую
    const tagsString = formattedTags.join(', ');
    console.log('TAGS STRING , FOR DB ! ')
    // устанавливаю эту строку в состояние
    setTags(tagsString);
    // console.log('HANDLE TAGS INPUT TAGS ! ')
    // console.log('HANDLE TAGS FOREMATED TAGS  ! ')
  };
  // console.log('NoFormatTags : ', noFormatTags)
  // console.log('TAGS : ', tags)


  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if(!tags || tags.length < 3){
      alert('надо указать хотя бы один тег');
      return;
    }
    if (title.trim().length < MIN_TITLE_LENGTH) {
      alert('заголовок должен быть не менее 5 символов');
      return;
    }
    try {
      const fields: PostFields = { title, text, tags }
      // console.log('ADD POST FIELDS  ! ')
      const response = isEditing
        ? await axios.patch(`/api/posts/${id}`, fields)
        : await axios.post('/api/posts', fields)
      console.log('ADD POST AXIOS POST API/POSTS RESPONSE ! ')
      const id_Response: string = isEditing ? id : response.data.post.id
      console.log('ADD POST RESPONSE DATA ID ! ')
      navigate(`/communism2.0/${id_Response}`)
    } catch (err) {
      console.error('ошибка при создании поста', err)
      alert('ошибка при создании поста')
    }
  }

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`).then(({ data }) => {
        console.log('ADDPOST USEEFFECT AXIOS.GET RES ! ')
        setTitle(data.title)
        setText(data.text)
        setTags(data.tags)
      })
    }
  }, [])


  return (
    <div className={style['page-container']}>
      <Header />
      <div className={style['add-post']}>

        <form className={style['form']}
          onSubmit={onSubmit}
        >
          <label className={style['label']}>
            Что предлагаете
            <textarea className={style['title-input']}
              placeholder="научу готовить"
              rows={2}
              value={title}
              onChange={handleTitleChange}
            />
            <span className={style['error-message']}>{errorTitleMessage}</span>
          </label>
          <label className={style['label']}>
            Описание и что взамен
            <textarea className={style['text-input']}
              placeholder="более детальное описание предложения и хотите ли что ни будь за это а может вам достаточно искреннего спаибо ?))"
              rows={8}
              value={text}
              onChange={handleTextChange}
            />
          </label>
          <label className={style['label']}>
            # Тэги
            <textarea className={style['tags-input']}
              placeholder="#приготовление еды #хачапури #массаж #погуляю с вашей собакой #составить компанию для просмотра вего властелина колец "
              rows={4}
              value={noFormatTags}
              onChange={handleTagsChange}
            />
            <span className={style['error-message']}>{errorTagsMessage}</span>
          </label>

          {isAuth
            ? (<button className={style['btn-submit']}
              type='submit'>
              {isEditing ? 'сохранить' : 'опубликовать'}
            </button>)
            : (<button className={style['btn-submit']}
              type='submit'
              disabled>
              надо залогиниться что бы отправить
            </button>

            )
          }


        </form>
      </div>
      <Footer />
    </div>
  )
}
