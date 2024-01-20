import style from './error.module.scss'

type typeProps = {
  message?: string
}

export const ErrorMessage = ({ message }: typeProps) => {

  if (!message) {
    return null
  } else {
    return (
      <div className={style['pzdc']}>
        {message}
     PZDC
      </div>
    )
  }
}