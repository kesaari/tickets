import React from "react";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilterButton, sortTicketsByPrice, sortTicketsByDuration, sortTicketsByOptimal } from "../../store/TicketSlice";
import { TicketsState, FilterButton } from '../../types/types';

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