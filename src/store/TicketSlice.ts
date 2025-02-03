import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TicketsState, Checkbox, CheckboxId, FilterId, FILTER_ID, CHECKBOX_ID } from '../types/types'

export const fetchID = createAsyncThunk('tickets/fetchSearchId', async () => {
  const response = await axios.get('https://aviasales-test-api.kata.academy/search')
  return response.data.searchId
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId: string) => {
  const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  return response.data
})

const initialState: TicketsState = {
  tickets: [],
  searchId: null,
  stop: false,
  ticketsToShow: 5,
  filterButtons: [
    { id: FILTER_ID.CHEAPER, text: 'Самые дешёвые', active: false },
    { id: FILTER_ID.FASTER, text: 'Самые быстрые', active: false },
    { id: FILTER_ID.OPTIMAL, text: 'Оптимальные', active: false },
  ],
  checkboxes: [
    { id: CHECKBOX_ID.ALL, label: 'Все', checked: false },
    { id: CHECKBOX_ID.NO_STOPS, label: 'Без пересадок', checked: false },
    { id: CHECKBOX_ID.ONE_STOP, label: '1 пересадка', checked: false },
    { id: CHECKBOX_ID.TWO_STOPS, label: '2 пересадки', checked: false },
    { id: CHECKBOX_ID.THREE_STOPS, label: '3 пересадки', checked: false },
  ],
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMoreTicket(state) {
      state.ticketsToShow += 5
    },
    toggleFilter: (state, action: PayloadAction<CheckboxId>) => {
      const filter = state.checkboxes.find((filter: Checkbox) => filter.id === action.payload)
      if (filter) {
        filter.checked = !filter.checked
        if (filter.id === CHECKBOX_ID.ALL) {
          state.checkboxes.forEach((f: Checkbox) => (f.id !== CHECKBOX_ID.ALL ? (f.checked = filter.checked) : null))
        } else {
          const allChecked = state.checkboxes.every((f: Checkbox) => (f.id !== CHECKBOX_ID.ALL ? f.checked : true))
          state.checkboxes.find((f: Checkbox) => f.id === CHECKBOX_ID.ALL)!.checked = allChecked
        }
      }
    },
    setActiveFilterButton: (state, action: PayloadAction<FilterId>) => {
      state.filterButtons.forEach((button) => (button.active = button.id === action.payload))
    },
    sortTicketsByPrice: (state) => {
      state.tickets = [...state.tickets].sort((a, b) => a.price - b.price)
    },
    sortTicketsByDuration: (state) => {
      state.tickets = [...state.tickets].sort((a, b) => {
        const totalDurationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0)
        const totalDurationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0)
        return totalDurationA - totalDurationB
      })
    },
    sortTicketsByOptimal: (state) => {
      state.tickets = [...state.tickets].sort((a, b) => {
        const totalDurationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0)
        const totalDurationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0)
        const optimalA = a.price * totalDurationA
        const optimalB = b.price * totalDurationB
        return optimalA - optimalB
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchID.fulfilled, (state, action) => {
        state.searchId = action.payload
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets]
        state.stop = action.payload.stop
      })
  },
})

export const {
  setActiveFilterButton,
  sortTicketsByPrice,
  sortTicketsByDuration,
  sortTicketsByOptimal,
  showMoreTicket,
  toggleFilter,
} = ticketsSlice.actions
export const ticketsReducer = ticketsSlice.reducer
