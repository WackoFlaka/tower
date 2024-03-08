import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TowerService {
    // NOTE POST request
    async createTower(data) {
        const tower = await dbContext.Towers.create(data)
        await tower.populate('creator')
        await tower.populate('ticketCount')
        return tower
    }

    // NOTE GET request
    async getAllTowers() {
        const towers = await dbContext.Towers.find().populate('creator').populate('ticketCount')
        return towers
    }

    // NOTE GET one tower request
    async getTowerById(towerId) {
        const tower = await dbContext.Towers.findById(towerId).populate('creator').populate('ticketCount')
        if (!tower) throw new Error(`No Event was found with id ${towerId}`)
        return tower
    }

    // NOTE UPDATE tower
    async updateTower(towerId, towerData, userId) {
        const towerToUpdate = await this.getTowerById(towerId)
        if (towerToUpdate.creatorId != userId) throw new Forbidden('You are not the creator of this event. Permission denied.')
        if(towerToUpdate.isCanceled == true) throw new BadRequest('Event is cancelled. Cannot Edit!')
        towerToUpdate.name = towerData.name || towerToUpdate.name
        towerToUpdate.description = towerData.description || towerToUpdate.description
        towerToUpdate.location = towerData.location || towerToUpdate.location
        towerToUpdate.coverImg = towerData.coverImg || towerToUpdate.coverImg
        towerToUpdate.capacity = towerData.capacity || towerToUpdate.capacity
        towerToUpdate.startDate = towerData.startDate || towerToUpdate.startDate
        // towerToUpdate.isCanceled = towerData.isCanceled || towerToUpdate.isCanceled || false
        towerToUpdate.type = towerData.type || towerToUpdate.type

        await towerToUpdate.save()
        return towerToUpdate
    }

    // NOTE DELETE tower / cancel event
    async cancelEvent(towerId, userId) {
        const tower = await this.getTowerById(towerId)
        if (tower.creatorId != userId) throw new Forbidden('You are not the creator of this event. Permission denied and event is not cancelled.')
        tower.isCanceled = true
        await tower.save()
        return `${tower.name} is cancelled`
    }

}

export const towerService = new TowerService()