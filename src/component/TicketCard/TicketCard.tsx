import React from "react";
import styles from "./TicketCard.module.css";
import { Ticket } from 'C:/Users/alisa/Desktop/учебка/ticketsApp/src/types/types.ts';

export const Card: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    const { price, carrier, segments } = ticket;

    const getStopsWord = (count: number): string => {
      if (count === 0) return "пересадок";
      if (count === 1) return "пересадка";
      if (count >= 2 && count <= 4) return "пересадки";
      return "пересадок";
    };

    const formatDate = (date: string, duration: number) => {
        const departureDate = new Date(date);
        const arrivalDate = new Date(departureDate.getTime() + duration * 60000);
        const departureTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const arrivalTime = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { departureTime, arrivalTime };
      };
    
      return (
        <li className={styles.ticket}>
          <div className={styles.ticketHeader}>
            <span className={styles.price}>{price} P</span>
            <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
          </div>
          {segments.map((segment, index) => {
            
            const { departureTime, arrivalTime } = formatDate(segment.date, segment.duration);
            const stopsWord = getStopsWord(segment.stops.length);

            return (
              <div key={index} className={styles.segment}>
                <div className={styles.flex}>
                  <span className={styles.text}>{segment.origin} - {segment.destination}</span>
                  <span className={styles.info}>{departureTime} - {arrivalTime}</span>
                </div>
                <div className={styles.flex}>
                  <span className={styles.text}>{"В ПУТИ"}</span>
                  <span className={styles.info}>{Math.floor(segment.duration / 60)}ч {segment.duration % 60}м</span>
                </div>
                <div className={styles.flex}>
                <span className={styles.text}>{segment.stops.length} {stopsWord.toUpperCase()}</span>
                  <span className={styles.info}>{segment.stops.join(', ')}</span>
                </div>
              </div>
            );
          })}
        </li>
      );
    };
