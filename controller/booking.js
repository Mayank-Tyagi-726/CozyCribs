const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

// Check availability for specific dates
module.exports.checkAvailability = wrapAsync(async (req, res) => {
    const { listingId } = req.params;
    const { checkIn, checkOut, guests } = req.query;

    if (!checkIn || !checkOut) {
        throw new ExpressError("Please provide check-in and check-out dates", 400);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
        throw new ExpressError("Check-out date must be after check-in date", 400);
    }

    // Find conflicting bookings
    const conflictingBookings = await Booking.find({
        listing: listingId,
        status: { $in: ['confirmed', 'pending'] },
        $or: [
            { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
            { checkIn: { $gte: checkInDate }, checkIn: { $lt: checkOutDate } }
        ]
    });

    const isAvailable = conflictingBookings.length === 0;

    res.json({
        available: isAvailable,
        conflictingBookings: conflictingBookings.length,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    });
});

// Create a new booking
module.exports.createBooking = wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError("You must be logged in to make a booking", 401);
    }

    const { listingId } = req.params;
    const { checkIn, checkOut, guests, specialRequests } = req.body;

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
        throw new ExpressError("Check-out date must be after check-in date", 400);
    }

    if (checkInDate < new Date()) {
        throw new ExpressError("Check-in date cannot be in the past", 400);
    }

    // Check availability
    const conflictingBookings = await Booking.find({
        listing: listingId,
        status: { $in: ['confirmed', 'pending'] },
        $or: [
            { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
            { checkIn: { $gte: checkInDate }, checkIn: { $lt: checkOutDate } }
        ]
    });

    if (conflictingBookings.length > 0) {
        throw new ExpressError("Selected dates are not available", 400);
    }

    // Calculate total price
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = listing.price * nights;

    // Create booking
    const booking = new Booking({
        user: req.user._id,
        listing: listingId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalPrice: totalPrice,
        specialRequests: specialRequests || ""
    });

    await booking.save();

    // For now, auto-confirm the booking (in real app, this would be after payment)
    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    await booking.save();

    res.redirect(`/bookings/success/${booking._id}`);
});

// Show booking success page
module.exports.bookingSuccess = wrapAsync(async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
        .populate('listing')
        .populate('user');

    if (!booking) {
        throw new ExpressError("Booking not found", 404);
    }

    res.render("bookings/success", { booking });
});

// Get user's bookings
module.exports.getUserBookings = wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError("You must be logged in to view bookings", 401);
    }

    const bookings = await Booking.find({ user: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });

    res.render("bookings/index", { bookings });
});

// Cancel a booking
module.exports.cancelBooking = wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError("You must be logged in to cancel a booking", 401);
    }

    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new ExpressError("Booking not found", 404);
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
        throw new ExpressError("You can only cancel your own bookings", 403);
    }

    // Check if booking can be cancelled (not already completed)
    if (booking.status === 'completed') {
        throw new ExpressError("Cannot cancel a completed booking", 400);
    }

    // Cancel the booking
    booking.status = 'cancelled';
    await booking.save();

    res.redirect('/bookings?cancelled=true');
});

// Get booking details
module.exports.getBookingDetails = wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError("You must be logged in to view booking details", 401);
    }

    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
        .populate('listing')
        .populate('user');

    if (!booking) {
        throw new ExpressError("Booking not found", 404);
    }

    // Check if user owns this booking
    if (booking.user._id.toString() !== req.user._id.toString()) {
        throw new ExpressError("You can only view your own bookings", 403);
    }

    res.render("bookings/show", { booking });
});
