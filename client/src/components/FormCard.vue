<template>
    <form @submit.prevent="createEvent()">
        <div class="row justify-content-between">
            <div class="col-md-12 col-lg-6 col-xxl-4 text-center">
                <h4>Image Preview</h4>
                <img :src="editableFormData.coverImg" class="image-preview">
            </div>
            <div class="col-md-12 col-lg-8 col-xxl-6">
                <div class="mb-3">
                    <input type="text" placeholder="Name" class="form-control" v-model="editableFormData.name" required>
                </div>
                <div class="mb-3">
                    <input type="text" placeholder="Location" class="form-control" v-model="editableFormData.location"
                        required>
                </div>
                <div class="mb-3">
                    <label for="type">Type</label>
                    <select v-model="editableFormData.type" class="form-control"
                        aria-label="Floating label select example" id="type" required>
                        <option v-for="type in types" :key="type" :value="type">
                            {{ type }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <input type="date" placeholder="Start Date" class="form-control"
                        v-model="editableFormData.startDate" required>
                </div>
                <div class="mb-3">
                    <input type="number" placeholder="Capacity" class="form-control" v-model="editableFormData.capacity"
                        required>
                </div>
                <div class="mb-3">
                    <input type="url" class="form-control" v-model="editableFormData.coverImg" placeholder="Image URL"
                        required>
                </div>
            </div>
        </div>
        <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="Enter Description"
            v-model="editableFormData.description" required></textarea>
        <div class="text-end mt-4">
            <button class="btn btn-primary">Create Event</button>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { eventService } from '../services/EventService.js';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editableFormData = ref({ name: '', location: '', startDate: '', capacity: '', type: '', description: '', coverImg: '' })
        const router = useRouter()
        return {
            editableFormData,
            types: ['concert', 'convention', 'sport', 'digital'],

            async createEvent() {
                try {
                    const event = await eventService.createEvent(editableFormData.value)
                    // @ts-ignore
                    router.push({ name: 'Event Details', params: { eventId: event.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.image-preview {
    height: 25vh;
    margin-bottom: 5vh;
}
</style>