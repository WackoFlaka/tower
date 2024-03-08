<template>
  <video class="video-container" autoplay loop muted>
    <source src="../assets/videos/video-background.mp4" type="video/mp4">
  </video>

  <!-- SECTION Home Page Introduction -->
  <section class="container-fluid introduction">
    <div class="row mx-5">
      <div class="col-12 col-lg-8 col-md-5 text-white">
        <h1 class="display-5">Event management for people,<br> by people</h1>
        <p class="fs-4">Whatever your interest, from hiking and reading to networking and skill sharing, there are
          thousands of people who share it on Tower. Events are happening every day - log in to join the fun.</p>
      </div>
    </div>
  </section>

  <!-- SECTION -->
  <section class="container-fluid  mb-5">
    <h1 class="display-5 m-5">How Tower works</h1>
    <div class="row justify-content-evenly">
      <div class="col-12 col-md-5">
        <div class="d-flex p-5 bg-body-secondary shadow h-100 hover ">
          <div><span class="mdi mdi-magnify fs-1"></span></div>
          <div>
            <h4 class="mb-3 ms-3">Discover events you're interested in</h4>
            <p class="fs-4 ms-3">Browse through community hosted events for all the things you love</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5 mt-5 mt-lg-3 mt-md-0">
        <div class="d-flex p-5 bg-body-secondary shadow h-100 hover">
          <div><span class="mdi mdi-plus fs-1 "></span></div>
          <div>
            <h4 class="mb-3 ms-3">Start an event to invite your friends</h4>
            <p class="fs-4 ms-3">Create your own Tower event, and draw from community of millions</p>
            <a href="#" class="ms-3">Create an event</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION -->
  <section class="container-fluid pt-5 mb-5">
    <h1 class="display-5 m-5">Explore top categories</h1>
    <div class="row justify-content-center">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2 text-center mb-3">
        <button type="button" class="btn bg-body-secondary w-75 h-100 all" @click="changeFilterTerm('all')">
          <span class="mdi mdi-all-inclusive display-1 text-success"></span>
          <h3>All</h3>
        </button>
      </div>

      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2 text-center mb-3">
        <button type="button" class="btn bg-body-secondary w-75 h-100 guitar" @click="changeFilterTerm('concert')">
          <span class="mdi mdi-guitar-electric display-1" style="color: purple;"></span>
          <h3>Concerts</h3>
        </button>
      </div>

      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2 text-center mb-3">
        <button type="button" class="btn bg-body-secondary w-75 h-100 group" @click="changeFilterTerm('convention')">
          <span class="mdi mdi-account-group display-1 text-primary-emphasis"></span>
          <h3>Conventions</h3>
        </button>
      </div>

      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2 text-center mb-3">
        <button type="button" class="btn bg-body-secondary w-75 h-100 soccer" @click="changeFilterTerm('sport')">
          <span class="mdi mdi-soccer display-1 text-primary"></span>
          <h3>Sports</h3>
        </button>
      </div>

      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-2 text-center mb-3">
        <button type="button" class="btn bg-body-secondary w-75 h-100 television" @click="changeFilterTerm('digital')">
          <span class="mdi mdi-television display-1 text-danger-emphasis"></span>
          <h3>Digital</h3>
        </button>
      </div>
    </div>
  </section>

  <!-- SECTION -->
  <section class="container-fluid">
    <h1 class="display-5 m-5">Upcoming Events</h1>
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-md-3">
        <EventCard :event="event" />
      </div>
    </div>
  </section>

</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { eventService } from '../services/EventService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { logger } from '../utils/Logger.js';

export default {
  setup() {

    const filterTerm = ref('all')

    // NOTE Starts any function on load page
    onMounted(() => {
      getAllEvents()
    })

    // NOTE Grabs All Events from the API
    async function getAllEvents() {
      try {
        await eventService.getAllEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      // events: computed(() => AppState.events),
      EventCard,
      filterTerm,
      changeFilterTerm(term) {
        filterTerm.value = term
        logger.log('Changed term', term)
      },
      events: computed(() => {
        if (filterTerm.value == 'all') {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterTerm.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.video-container {
  filter: brightness(30%);
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.introduction {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hover {
  border: 4px solid black;
  border-radius: 6px;
  transition: all 0.3s ease 0s;
}

.hover:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: greenyellow;
}

.all,
.guitar,
.group,
.soccer,
.television {
  border: 4px solid black;
  border-radius: 6px;
  transition: all 0.3s ease 0s;
}

.all:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: rgb(8, 255, 8);
}

.guitar:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: rgb(197, 0, 197);
}

.group:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: rgb(0, 0, 150);
}

.soccer:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: rgb(40, 169, 255);
}

.television:hover {
  border-radius: 50px;
  transition: all 0.3s ease 0s;
  border-color: brown;
}
</style>
