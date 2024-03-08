import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentService {
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }
    
    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }
    
    async deleteComment(commentId, userId) {
        const WantToDelete = await dbContext.Comments.findById(commentId)
        if(!WantToDelete) throw new BadRequest(`Invalid id: ${commentId}`)
        if(WantToDelete.creatorId != userId) throw new Forbidden(`Access Denied.`)
        await WantToDelete.deleteOne()
        return 'Comment Deleted'
    }
    
}

export const commentService = new CommentService()