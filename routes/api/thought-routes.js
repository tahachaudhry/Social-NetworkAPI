const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(deleteThought)

// reactions
router 
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;