const providersController = require('../controllers/providers.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/providers
// GET http://localhost:3000/api/providers/6
router.get("/providers/:id?", providersController.getProvider);


// POST http://localhost:3000/api/providers/
router.post("/providers", providersController.createProvider);

// PUT http://localhost:3000/api/providers/id
router.put("/providers/:id?", providersController.editProvider);

// DELETE http://localhost:3000/api/providers/id
router.delete("/providers/:id?", providersController.deleteProvider);

module.exports = router;