import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerService } from "../services/TowerService.js";
import { dbContext } from "../db/DbContext.js";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class TowerController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowers)
            .get('/:towerId', this.getTowerById)
            .get('/:eventId/tickets', this.getTicketsForEvent)
            .get('/:eventId/comments', this.getCommentsForEvent)
            .use(Auth0Provider.getAuthorizedUserInfo) // this middleware attaches .userInfo to the request parameter
            .post('', this.createTower)
            .put('/:towerId', this.updateTower)
            .delete('/:towerId', this.cancelEvent)

    }
    /**
  * Sends all values back to the client
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
    async createTower(request, response, next) {
        try {
            const towerData = request.body
            // @ts-ignore
            towerData.creatorId = request.userInfo.id
            const tower = await towerService.createTower(towerData)
            response.send(tower)
        } catch (error) {
            next(error)
        }
    }

    async getAllTowers(request, response, next) {
        try {
            const towers = await towerService.getAllTowers()
            response.send(towers)
        } catch (error) {
            next(error)
        }
    }

    async getTowerById(request, response, next) {
        try {
            const towerId = request.params.towerId
            const tower = await towerService.getTowerById(towerId)
            response.send(tower)
        } catch (error) {
            next(error)
        }
    }

    async updateTower(request, response, next) {
        try {
            const towerId = request.params.towerId
            const towerData = request.body
            const userId = request.userInfo.id
            const tower = await towerService.updateTower(towerId, towerData, userId)
            response.send(tower)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(request, response, next) {
        try {
            const towerId = request.params.towerId
            const userId = request.userInfo.id
            const message = await towerService.cancelEvent(towerId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    
    async getTicketsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTicketsForEvent(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    
    async getCommentsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getCommentsForEvent(eventId)
            response.send(comments)
        } catch (error) {
            
        }
    }
}