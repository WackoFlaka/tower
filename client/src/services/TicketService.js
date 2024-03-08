import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketService {
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        logger.log('TICKET CREATED!', response.data)
        AppState.tickets.push(new Ticket(response.data))
    }
    
    async deleteTicket(id) {
        const response = await api.delete(`api/tickets/${id}`)
        logger.log('DELETEING THIS TICKET', response.data)
        const index = AppState.tickets.findIndex(ticket => ticket.id == id)
        if(index == -1) throw new Error('Index not found!')
        AppState.tickets.splice(index, 1)
    }
    
    async getTicketsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Tickets for this event:', response.data)
        const tickets = response.data.map(ticket => new Ticket(ticket))
        AppState.tickets = tickets
    }
    
    async getMyEventsTickets() {
        const response = await api.get('account/tickets')
        const newTickets = response.data.map(pojo => new Ticket(pojo))
        AppState.myTickets = newTickets
      }
    
}

export const ticketService = new TicketService()