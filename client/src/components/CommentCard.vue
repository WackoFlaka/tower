<template>
    <div class="bg-light p-5 mt-3">
        <div class="d-flex position-relative">
            <div>
                <img :src="comment.creator.picture" alt="" height="70" style="border-radius: 50%;">
            </div>
            <div class="ms-4">
                <h3>{{ comment.creator.name }}</h3>
                <p>{{ comment.body }}</p>
            </div>
            <p class="profile text-success" v-if="comment.creatorId == account.id">Host</p>
            <!-- FIXME <p class="profile" style="color: purple;" v-if="isAttend">Attending</p> -->
        </div>
        <div class="text-end">
            <button type="button" class="btn btn-danger" v-if="comment.creatorId == account.id"
                @click="deleteComment(comment.id)">Delete</button>
        </div>
    </div>
</template>


<script>
import { computed } from "vue";
import { Comment } from "../models/Comment.js"
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentService } from "../services/CommentService.js";

export default {
    props: {
        comment: { type: Comment, required: true }
    },

    setup(props) {
        return {
            event: computed(() => AppState.events),
            account: computed(() => AppState.account),
            //FIXME -  isAttend: computed(() => props.comment.creator.some(attend => attend.id == AppState.tickets.accountId)

            async deleteComment(id) {
                try {
                    await commentService.deleteComment(id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.profile {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
}
</style>