// @ts-nocheck
import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventService {
    // NOTE Grabs ALL events from the API. GET METHOD
  async getAllEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(event => new Event(event))
    AppState.events = events
    logger.log(AppState.events)
  }
  
  async  getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = new Event(response.data)
    logger.log(AppState.activeEvent)
  }
  
  async createEvent(data) {
    const response = await api.post('api/events', data)
    const newEvent = new Event(response.data)
    AppState.events.push(newEvent)
    return newEvent
}

async cancelEvent(id) {
  const response = await api.delete(`api/events/${id}`)
  logger.log('Cancelled Event!', response.data)
  AppState.activeEvent.isCanceled = true
}
    
}

export const eventService = new EventService()