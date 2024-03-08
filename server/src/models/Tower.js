import { Schema } from "mongoose";

export const TowerSchema = new Schema({
    creatorId: {
        type: Schema.ObjectId,
        ref: 'Account',
        required: true
    },
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        minLength: 15,
        maxLength: 1000,
        required: true,
    },
    location: {
        type: String,
        minLength: 1,
        maxLength: 500,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        minLength: 1,
        maxLength: 5000,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    isCanceled: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        enum: [
            'concert',
            'convention',
            'sport',
            'digital'
        ],
        required: true
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

TowerSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TowerSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
})