import { Event } from "./Event.js"

export class Ticket {
    constructor(data) {
        this.id = data.id || data._id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.profile = data.profile
        this.event = data.event ? new Event(data.event) : null
    }
}