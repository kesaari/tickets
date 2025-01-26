import React, {useEffect} from "react";
import { Card } from '../TicketCard/TicketCard';
import { fetchID, fetchTickets, showMoreTicket } from '../../store/TicketSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./search.module.css";
import { FilterButtons } from '../FilterButtons/FiltersButtons';
import { TicketsState } from 'C:/Users/alisa/Desktop/учебка/ticketsApp/src/types/types.ts';

export const Search = () => {

  const dispatch = useDispatch();
  const { tickets, searchId, stop, checkboxes, ticketsToShow } = useSelector((state: { tickets: TicketsState }) => state.tickets);
  const activeFilters = checkboxes.filter(filter => filter.checked && filter.id !== 'all').map(filter => filter.id);

  useEffect(() => {
    if (!searchId) {
      dispatch(fetchID());
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets(searchId));
    }
  }, [dispatch, searchId, stop]);

    const filteredTickets = tickets.filter(ticket => {
      const stopsCountThere = ticket.segments[0].stops.length;
      const stopsCountBack = ticket.segments[1].stops.length;
      if (activeFilters.length === 0) return true;
      return activeFilters.some(filter => {
        switch (filter) {
          case 'no_stops':
            return stopsCountThere === 0 && stopsCountBack === 0;
          case 'one_stop':
            return stopsCountThere === 1 && stopsCountBack === 1;
          case 'two_stops':
            return stopsCountThere === 2 && stopsCountBack === 2;
          case 'three_stops':
            return stopsCountThere === 3 && stopsCountBack === 3;
          default:
            return false;
        }
      });
    });
  
    return (
      <div>
        <FilterButtons />
        <ul className={styles.list}>{filteredTickets.slice(0, ticketsToShow).map((ticket, index) => <Card key={index} ticket={ticket} />)}</ul>
        <button className={styles.btn} onClick={() => dispatch(showMoreTicket())}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      </div>
    );
  };