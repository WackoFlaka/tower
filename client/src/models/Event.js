export class Event {
    /**
     * @param {{ id: any; _id: any; name: any; description: any; coverImg: any; isCanceled: any; location: any; type: any; creator: any; creatorId: any; startDate: string | number | Date; }} data
     */
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.isCanceled = data.isCanceled
        this.location = data.location
        this.type = data.type
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.startDate = new Date(data.startDate)
    }
}