import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../../store/TicketSlice';
import styles from "./Checkboxes.module.css";
import { TicketsState, Checkbox } from 'C:/Users/alisa/Desktop/учебка/ticketsApp/src/types/types.ts';

export const Checkboxes = () => {
  const checkboxes = useSelector((state: {tickets: TicketsState}) => state.tickets.checkboxes);
  const dispatch = useDispatch();

  const handleToggle = (id: string) => {
    dispatch(toggleFilter(id));
  };

  return (
    <div className={styles.board}>
      <span className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {checkboxes.map((checkbox: Checkbox) => (
        <div key={checkbox.id}>
          <input
            type="checkbox"
            checked={checkbox.checked}
            onChange={() => handleToggle(checkbox.id)}
          />
          <label>{checkbox.label}</label>
        </div>
      ))}
    </div>
  );
};