// Import required modules using ECMAScript modules syntax
import express from 'express';

// Create a router instance
const router = express.Router();

// Define route handlers
router.get('/sample', (req, res) => {
    res.json({ message: 'This is a sample endpoint' });
});

// Export the router
export default router;