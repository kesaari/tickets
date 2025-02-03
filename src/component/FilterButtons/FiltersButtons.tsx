import React from 'react'
import styles from './Filters.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveFilterButton,
  sortTicketsByPrice,
  sortTicketsByDuration,
  sortTicketsByOptimal,
} from '../../store/TicketSlice'
import { TicketsState, FilterButton, FilterId, FILTER_ID } from '../../types/types'

export const FilterButtons: React.FC = () => {
  const dispatch = useDispatch()
  const filterButtons = useSelector((state: { tickets: TicketsState }) => state.tickets.filterButtons)

  const changeFilter = (filterType: FilterId) => {
    dispatch(setActiveFilterButton(filterType))

    if (filterType === FILTER_ID.CHEAPER) {
      dispatch(sortTicketsByPrice())
    } else if (filterType === FILTER_ID.FASTER) {
      dispatch(sortTicketsByDuration())
    } else if (filterType === FILTER_ID.OPTIMAL) {
      dispatch(sortTicketsByOptimal())
    }
  }

  return (
    <div className={styles.filterButtons}>
      {filterButtons.map((button: FilterButton) => (
        <button
          key={button.id}
          onClick={() => changeFilter(button.id)}
          className={button.active ? styles.active : styles.button}
        >
          {button.text.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
