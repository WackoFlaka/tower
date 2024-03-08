<template>
    <RouterLink :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <div class="event-card mb-5" v-if="event">
            <div class="position-relative">
                <img :src="event.coverImg" alt="coverImg" class="event-coverImg">
                <span class="mdi mdi-guitar-electric fs-3 event-type" v-if="event.type == 'concert'"
                    style="color: purple;"></span>
                <span class="mdi mdi-account-group fs-3 text-primary-emphasis event-type"
                    v-else-if="event.type == 'convention'"></span>
                <span class="mdi mdi-soccer fs-3 text-primary event-type" v-else-if="event.type == 'sport'"></span>
                <span class="mdi mdi-television fs-3 text-danger-emphasis event-type" v-else></span>
                <h4 class="cancelled" v-if="event.isCanceled">CANCELLED</h4>
            </div>
            <div class="event-details">
                <h4>{{ event.name }}</h4>
                <p class="fs-5">{{ event.startDate.toLocaleDateString() }} - {{ event.location }}</p>
            </div>
        </div>
    </RouterLink>
</template>


<script>
import { Event } from '../models/Event.js';

export default {
    props: {
        event: { type: Event, required: true }
    },

    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.event-card {
    width: 100%;
    height: 45vh;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.cancelled {
    position: absolute;
    left: 0;
    bottom: 0;
    color: white;
    background-color: orange;
    padding: 5px;
    margin-left: 20px;
    border-radius: 5px;
}

.event-coverImg {
    width: 100%;
    height: 25vh;
    object-fit: cover;
}

.event-type {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    padding: 10px;
}

.event-details {
    padding: 14px;
}
</style>