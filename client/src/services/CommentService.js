import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentService {
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        logger.log('COMMENT CREATED CREATED!', response.data)
        AppState.comments.push(new Comment(response.data))
    }
    async getCommentsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('Comments for this event (service)', response.data)
        const comments = response.data.map(comment => new Comment(comment))
        AppState.comments = comments
    }
    
    async deleteComment(id) {
        const response = await api.delete(`api/comments/${id}`)
        logger.log('Comment Deleted!: ', response.data)
        const index = AppState.comments.findIndex(comment => comment.id == id)
        AppState.comments.splice(index, 1)
    }
    
}

export const commentService = new CommentService()