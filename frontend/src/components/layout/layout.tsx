import { ReactNode } from 'react'
import style from './layout.module.scss'
import Header from '../header/header'

type typeProps = {
  children: ReactNode
}

export default function Layout({children}: typeProps) {
  return (
    <div className={style.layout}>
      <Header/>
      {children}
    </div>
  )
}
