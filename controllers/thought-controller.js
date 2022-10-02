const { Thought, User } = require('../models');

const thoughtController = {
    //find all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //find by id
    getThoughtsById({params}, res){
        Thought.findOne({_id: params.id})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //create thought
    createThought({params, body}, res){
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                {username: body.username},
                {$push: { thoughts: _id }},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //create reaction
    createReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //update thought
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //delete thought
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //remove reaction
    removeReaction({params}, res){
        Thought.findByIdAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    }
};

module.exports = thoughtController;