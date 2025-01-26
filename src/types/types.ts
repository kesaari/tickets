export interface Ticket {
    price: number;
    carrier: string;
    segments: {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    }[];
  }
  
  export interface FilterButton {
    value: string;
    text: string;
    active: boolean;
  }
  
  export interface Checkbox {
    id: string;
    label: string;
    checked: boolean;
  }
  
  export interface TicketsState {
    tickets: Ticket[];
    searchId: string | null;
    stop: boolean;
    ticketsToShow: number;
    filterButtons: FilterButton[];
    checkboxes: Checkbox[];
  }