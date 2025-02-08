import React from 'react'
import { useEffect } from 'react'
import { Card } from '../TicketCard'
import { fetchID, fetchTickets, showMoreTicket } from '../../store/TicketSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Search.module.css'
import { FilterButtons } from '../FilterButtons'
import { TicketsState } from '../../types/types'
import { AppDispatch } from '../../store/index'
import { CHECKBOX_ID } from '../../types/types'

export const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, searchId, stop, checkboxes, ticketsToShow } = useSelector(
    (state: { tickets: TicketsState }) => state.tickets,
  )
  const activeFilters = checkboxes
    .filter((filter) => filter.checked && filter.id !== CHECKBOX_ID.ALL)
    .map((filter) => filter.id);

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchID())
    }
  }, [dispatch, searchId])

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets(searchId))
    }
  }, [dispatch, searchId, stop])

  const filteredTickets = tickets.filter((ticket) => {
    const stopsCountThere = ticket.segments[0].stops.length;
    const stopsCountBack = ticket.segments[1].stops.length;
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filter) => {
      switch (filter) {
        case CHECKBOX_ID.NO_STOPS:
          return stopsCountThere === 0 && stopsCountBack === 0;
        case CHECKBOX_ID.ONE_STOP:
          return stopsCountThere === 1 && stopsCountBack === 1;
        case CHECKBOX_ID.TWO_STOPS:
          return stopsCountThere === 2 && stopsCountBack === 2;
        case CHECKBOX_ID.THREE_STOPS:
          return stopsCountThere === 3 && stopsCountBack === 3;
        default:
          return false;
      }
    });
  });

  return (
    <div>
      <FilterButtons />
      <ul className={styles.list}>
        {filteredTickets.slice(0, ticketsToShow).map((ticket, index) => (
          <Card key={index} ticket={ticket} />
        ))}
      </ul>
      <button className={styles.btn} onClick={() => dispatch(showMoreTicket())}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
      </button>
    </div>
  )
}
