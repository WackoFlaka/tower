<template>
    <div class="event-container" v-if="event">
        <img :src="event.coverImg" alt="Cover Image" class="event-coverImg" style="border-bottom: 10px solid purple;"
            v-if="event.type == 'concert'">
        <img :src="event.coverImg" alt="Cover Image" class="event-coverImg" style="border-bottom: 10px solid blue;"
            v-if="event.type == 'convention'">
        <img :src="event.coverImg" alt="Cover Image" class="event-coverImg" style="border-bottom: 10px solid #a2eefa;"
            v-if="event.type == 'sport'">
        <img :src="event.coverImg" alt="Cover Image" class="event-coverImg" style="border-bottom: 10px solid brown;"
            v-if="event.type == 'digital'">
        <h1 class="cancelled" v-if="event.isCanceled">CANCELLED</h1>
    </div>

    <section class="container-fluid">
        <div class="row justify-content-evenly">
            <div class="col-7 p-5" v-if="event">
                <div class="d-flex mb-3 align-items-center">
                    <div class="p-5 fs-1">{{ event.name }}</div>
                    <div class="px-4 py-1 fs-5 bg-body-secondary rounded" style="color: purple;"
                        v-if="event.type == 'concert'">Concert</div>
                    <div class="px-4 py-1 fs-5 bg-body-secondary rounded text-primary-emphasis"
                        v-else-if="event.type == 'convention'">Convention</div>
                    <div class="px-4 py-1 fs-5 bg-body-secondary rounded text-primary"
                        v-else-if="event.type == 'sport'">Sport</div>
                    <div class="px-4 py-1 fs-5 bg-body-secondary rounded text-danger-emphasis" v-else>Digital</div>
                    <div class="p-2 ms-auto">
                        <div class="dropdrown" v-if="event.creatorId == account.id">
                            <button class="btn fs-3 bg-body-secondary" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false" :disabled="event.isCanceled"><span
                                    class="mdi mdi-dots-horizontal"></span></button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click="cancelEvent()">Cancel</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-5">
                    <p class="fs-4">{{ event.description }}</p>
                    <h3 class="mt-5">Date and Time</h3>
                    <div class="d-flex fs-4">
                        <span class="mdi mdi-calendar-range me-3"></span>
                        <p>{{ event.startDate }}</p>
                    </div>

                    <h3 class="mt-5">Location</h3>
                    <div class="d-flex fs-4">
                        <span class="mdi mdi-map-marker me-3"></span>
                        <p>{{ event.location }}</p>
                    </div>
                    <h3 class="mt-5 mb-3">See what folks are saying...</h3>
                    <div class="bg-body-secondary w-100 p-5">
                        <p class="text-success text-end fw-bold">Join the conversation</p>
                        <form @submit.prevent="createComment()">
                            <textarea name="body" id="" cols="30" rows="10" class="form-control mb-3"
                                placeholder="Tell the people..." v-model="editableData.body"
                                :disabled="event.isCanceled"></textarea>
                            <div class="text-end">
                                <button type="submit" class="btn btn-success text-light"
                                    :disabled="event.isCanceled">Post Comment</button>
                            </div>
                        </form>
                        <!-- TODO print comments here -->
                        <div v-for="comment in comments" :key="comment.id">
                            <CommentCard :comment="comment" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3 p-5 my-5" v-if="event">
                <div class="bg-body-secondary text-center p-5 rounded">
                    <div v-if="event.isCanceled">
                        <h3 class="text-danger">Event is Cancelled!</h3>
                        <p>Sorry!</p>
                    </div>
                    <div v-else-if="!isAttend && account.id">
                        <h3>Interested in going?</h3>
                        <p>Grab a ticket!</p>
                    </div>
                    <div v-else-if="isAttend && account.id">
                        <h3 class="text-success">You are attending this event!</h3>
                        <p>We are excited to see you there!</p>
                    </div>
                    <div v-else-if="!account.id">
                        <h3 class="text-warning">Login to attend this event!</h3>
                        <p>Grab a ticket!</p>
                    </div>
                    <div v-if="!isAttend">
                        <button type="button" class="btn btn-primary" v-if="account.id" @click="createTicket()"
                            :disabled="isAttend || event.isCanceled">Attend</button>
                    </div>
                    <div v-else>
                        <button type="button" class="btn btn-danger" v-if="account.id"
                            @click="deleteTicket(isAttendData.id)">DeleteTicket</button>
                    </div>

                </div>

                <div class="margin">
                    <h3>Attendees</h3>
                    <div class="bg-body-secondary text-center p-5 rounded">
                        <!-- TODO print out attendees here -->
                        <div v-for="ticket in tickets" :key="ticket.id">
                            <div class="d-flex mb-4">
                                <div style="border-left: 5px solid blue;" class="me-4"></div>
                                <img :src="ticket.profile.picture" alt="" height="60" style="border-radius: 50%;"
                                    class="me-4">
                                <h3 class="align-self-center">{{ ticket.profile.name }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import Pop from '../utils/Pop.js'
import { eventService } from '../services/EventService.js'
import { AppState } from '../AppState.js'
import { ticketService } from '../services/TicketService.js'
import { commentService } from '../services/CommentService.js'
import CommentCard from '../components/CommentCard.vue'

export default {
    setup() {
        const route = useRoute()
        const editableData = ref({})

        onMounted(() => {
            getEventById()
            getTicketsByEventId()
            getCommentsbyEventId()
        })

        async function getEventById() {
            try {
                await eventService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getTicketsByEventId() {
            try {
                await ticketService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getCommentsbyEventId() {
            try {
                await commentService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            users: computed(() => AppState.user),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            isAttend: computed(() => AppState.tickets.some(attend => attend.accountId == AppState.account.id)),
            isAttendData: computed(() => AppState.tickets.find(attend => attend.accountId == AppState.account.id)),
            editableData,

            async cancelEvent() {
                try {
                    const event = AppState.activeEvent
                    const WantToCancel = await Pop.confirm(`Are you sure you want to cancel this event called ${event.name}? These changes cannot be reversed!`)
                    if (!WantToCancel) return
                    await eventService.cancelEvent(event.id)
                } catch (error) {
                    Pop.error(error)
                }
            },


            async createTicket() {
                try {
                    const ticketData = { eventId: route.params.eventId }
                    await ticketService.createTicket(ticketData)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async deleteTicket(id) {
                try {
                    await ticketService.deleteTicket(id)
                } catch (error) {
                    Pop.error(error)
                }

            },

            async createComment() {
                try {
                    // @ts-ignore
                    const eventId = { eventId: route.params.eventId, body: editableData.value.body }
                    await commentService.createComment(eventId)
                    editableData.value = {}
                    Pop.success('Comment Posted')
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    },
    components: { CommentCard }
}
</script>


<style lang="scss" scoped>
.event-container {
    position: relative;
}

.cancelled {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: orange;
    padding: 20px;
    border-radius: 16px;
    background-color: rgba(255, 226, 173, 0.308);
    font-size: 20rem;
}

.event-coverImg {
    width: 100%;
    height: 70vh;
    filter: brightness(60%);
    object-fit: cover;
}

.margin {
    margin-top: 20vh;
}

.profile {
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    margin-right: 20px;
}
</style>
