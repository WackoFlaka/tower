import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  // @ts-ignore
  account: {},
  
  /** @type {import('./models/Event.js').Event[]} */
  events: [],
  
   /** @type {import('./models/Event.js').Event | null} */
  activeEvent: null,
  
   /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],
  myTickets: [],
  
  /** @type {import('./models/Comment.js').Comment[]} */
    // @ts-ignore
  comments: [],
})
