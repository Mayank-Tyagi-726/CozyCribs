const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        maxlength: 500
    },
    bookingReference: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Generate unique booking reference
bookingSchema.pre('save', function(next) {
    if (!this.bookingReference) {
        this.bookingReference = 'CC' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
    }
    this.updatedAt = new Date();
    next();
});

// Index for efficient queries
bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ bookingReference: 1 });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
