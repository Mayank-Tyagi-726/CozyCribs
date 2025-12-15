
const Listing = require("../models/listing")

module.exports.allListings = async(req, res) => {
    try {
        // Build filter query based on URL parameters
        let filterQuery = {};
        const { search, location, country, maxPrice } = req.query;

        // Add search functionality
        if (search) {
            filterQuery.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        // Add location filter
        if (location) {
            filterQuery.location = { $regex: location, $options: 'i' };
        }

        // Add country filter
        if (country) {
            filterQuery.country = { $regex: country, $options: 'i' };
        }

        // Add price filter
        if (maxPrice) {
            filterQuery.price = { $lte: parseInt(maxPrice) };
        }

        // Execute query with filters
        const allListings = await Listing.find(filterQuery).lean();

        // If it's an AJAX request (from client-side filtering), return JSON
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.json({
                listings: allListings,
                total: allListings.length,
                filters: { search, location, country, maxPrice }
            });
        }

        // For regular page load, render the template
        res.render("./listings/index.ejs", { allListings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).render('error', { 
            message: 'Error loading listings',
            error: error 
        });
    }
}
