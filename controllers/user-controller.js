const {User} = require('../models')

const userController = {
    //get all users
    getAllUsers(req,res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    //find users by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate ({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //Create User
    createUser({body}, res) {
        User.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: { friends: params.friendId }},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //update user
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id }, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //delete user
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    //remove friends
    removeFriends({params}, res){
        User.findByIdAndUpdate(
            {_id: params.userId},
            {$pull: {friends: parmas.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'Cannot find user with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    }
};

module.exports = userController