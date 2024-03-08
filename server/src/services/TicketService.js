import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class TicketService {
    async getEventTickets(userId) {
      const eventTickets = await dbContext.Tickets.find({ accountId: userId })
      .populate({
        path: 'event',
        populate: {
            path: 'ticketCount'
        }
      })
      return eventTickets
    }
    
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        return ticket
    }
    
    async getTicketsForEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        return tickets
    }
    
    async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId)
        if(!ticketToDelete) throw new BadRequest(`Invalid id: ${ticketId}`)
        if(ticketToDelete.accountId != userId) throw new Forbidden(`Access Denied.`)
        await ticketToDelete.deleteOne()
        return `Ticket Deleted`
    }
    
}

export const ticketService = new TicketService() 