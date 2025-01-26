import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TicketsState } from '../types/types';

export const fetchID = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await axios.get('https://aviasales-test-api.kata.academy/search');
  return response.data.searchId;
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId: string) => {
  const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
  return response.data;
});

const initialState: TicketsState = {
  tickets: [],
  searchId: null,
  stop: false,
  ticketsToShow: 5,
  filterButtons: [
    { value: 'cheaper', text: "Самые дешёвые", active: false },
    { value: 'faster', text: "Самые быстрые", active: false },
    { value: 'optimal', text: "Оптимальные", active: false },
  ],
  checkboxes: [
    { id: 'all', label: 'Все', checked: true },
    { id: 'no_stops', label: 'Без пересадок', checked: false },
    { id: 'one_stop', label: '1 пересадка', checked: false },
    { id: 'two_stops', label: '2 пересадки', checked: false },
    { id: 'three_stops', label: '3 пересадки', checked: false },
    
  ]
};

  const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
      showMoreTicket(state) {
        state.ticketsToShow += 5;
      },
      toggleFilter: (state, action) => {
      const filter = state.checkboxes.find(filter => filter.id === action.payload);
      if (filter) {
        filter.checked = !filter.checked;
        if (filter.id === 'all') {
          state.checkboxes.forEach(f => (f.id !== 'all' ? (f.checked = filter.checked) : null));
        } else {
          const allChecked = state.checkboxes.every(f => (f.id !== 'all' ? f.checked : true));
          state.checkboxes.find(f => f.id === 'all').checked = allChecked;
          }
        }
      },
      setActiveFilterButton: (state, action: PayloadAction<string>) => {
        state.filterButtons.forEach(button => button.active = button.value === action.payload);
      },
      sortTicketsByPrice: (state) => {
        state.tickets = [...state.tickets].sort((a, b) => a.price - b.price);
      },
      sortTicketsByDuration: (state) => {
        state.tickets = [...state.tickets].sort((a, b) => {
          const totalDurationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
          const totalDurationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);
          return totalDurationA - totalDurationB;
        });
      },
      sortTicketsByOptimal: (state) => {
        state.tickets = [...state.tickets].sort((a, b) => {
          const totalDurationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
          const totalDurationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);
          const optimalA = (a.price * totalDurationA);
          const optimalB = (b.price * totalDurationB);
          return optimalA - optimalB;
        });
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchID.fulfilled, (state, action) => {
          state.searchId = action.payload;
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
          state.tickets = [...state.tickets, ...action.payload.tickets];
          state.stop = action.payload.stop;
        });
}
})

export const { setActiveFilterButton, sortTicketsByPrice, sortTicketsByDuration, sortTicketsByOptimal, showMoreTicket, toggleFilter} = ticketsSlice.actions;
export default ticketsSlice.reducer;