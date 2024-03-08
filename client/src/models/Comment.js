export class Comment {
    constructor(data) {
        this.id = data.id || data._id
        this.creator = data.creator 
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.createdAt = new Date(data.createdAt)
        this.body = data.body
    }
}