<template>
  <section class="container-fluid section">
    <div class="row justify-content-center">
      <div class="col-sm-11 col-md-9 col-lg-8">
        <div class="d-flex align-items-center">
          <div>
            <img :src="account.picture" alt="" style="height: 20vh; border-radius: 50%;">
          </div>
          <div class="ms-5">
            <h1>{{ account.name }}</h1>
            <p>Tickets: {{ tickets.length }}</p>
          </div>
        </div>
      </div>

      <section class="container-fluid">
        <h1 class="display-5 m-5">Create an event</h1>
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-8 col-lg-6">
            <FormCard />
          </div>
        </div>
      </section>

      <section class="container-fluid">
        <h1 class="display-5 m-5">Upcoming Events</h1>
        <div class="row">
          <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-3">
            <EventCard :event="ticket.event" />
          </div>
        </div>
      </section>
    </div>
  </section>

</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { ticketService } from '../services/TicketService.js';



export default {
  setup() {

    onMounted(() => {
      getMyEventsTickets()
    })

    async function getMyEventsTickets() {
      try {
        await ticketService.getMyEventsTickets()
      } catch (error) {
        Pop.error
      }
    }
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
.section {
  padding-top: 50px;
}
</style>
