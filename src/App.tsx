import React from 'react'
import { Checkboxes } from './component/Checkboxes/Checkboxes'
import { Search } from './component/Search'
import { Header } from './component/Header'
import styles from './App.module.css'

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.flexCont}>
        <Checkboxes />
        <Search />
      </div>
    </>
  )
}
