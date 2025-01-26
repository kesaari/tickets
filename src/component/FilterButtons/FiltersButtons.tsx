import React from "react";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilterButton, sortTicketsByPrice, sortTicketsByDuration, sortTicketsByOptimal } from "C:/Users/alisa/Desktop/учебка/ticketsApp/src/store/TicketSlice.ts";
import { TicketsState, FilterButton } from 'C:/Users/alisa/Desktop/учебка/ticketsApp/src/types/types.ts';

export const FilterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const filterButtons = useSelector((state: { tickets: TicketsState }) => state.tickets.filterButtons);

  const changeFilter = (filterType: string) => {
    dispatch(setActiveFilterButton(filterType));

    if (filterType === 'cheaper') {
      dispatch(sortTicketsByPrice());
    } else if (filterType === 'faster') {
      dispatch(sortTicketsByDuration());
    } else if (filterType === 'optimal') {
      dispatch(sortTicketsByOptimal());
    }
  };

  return (
    <div className={styles.filterButtons}>
      {filterButtons.map((button: FilterButton) => (
        <button
          key={button.value}
          onClick={() => changeFilter(button.value)}
          className={button.active ? styles.active : styles.button}
        >
          {button.text.toUpperCase()}
        </button>
      ))}
    </div>
  );
};