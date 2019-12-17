const User = require('../models/user-model')

createUser = (req, res) => {
    const body = req.body
    // console.log("createUser - body:", body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'user created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'user not created!',
            })
        })
}
addImageToUser = async (req, res) => {
    // console.log("addImageToUser!")
    let email = req.params.email
    let imgName = req.params.imgName
    // console.log("email--" + email)
    // console.log("imgName--" + imgName)
    await User.findOneAndUpdate({ email: email },
        { $set: { imgName: imgName } },
        { useFindAndModify: false },
        function (err, doc) {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }
            else { 
                // console.log("Updated User Image!"); 
            }
        });
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user._id = body._id
        user.name = body.name
        user.role = body.role
        user.imgName = body.imgName
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'user updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'user not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

// getUserById = async (req, res) => {
//     await User.findOne({ _id: req.params.id }, (err, user) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!user) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `user not found` })
//         }
//         return res.status(200).json({ success: true, data: user })
//     }).catch(err => console.log(err))
// }


getUserByName = async (req, res) => {
    await User.findOne({ email: req.params.email }, (err, user) => {
        // console.log("getUserByName - user.password:",user.password)
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        return res.status(200).json({ success: true, data: user })
    })
        .catch(err => console.log(err))
}


getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}


getUserFavorites = async (req, res) => {
    // console.log("getUserFavorites!")
    let email = req.params.email
    // console.log("email--" + email)
    await User.find({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}



addToUserFavorites = async (req, res) => {
    // console.log("addToUserFavorites!")
    let email = req.params.email
    let favoritId = req.params.favoritId
    // console.log("email--" + email)
    // console.log("favoritId--" + favoritId)
    User.findOneAndUpdate({ email: req.params.email },
        { $push: { favorites: favoritId } },
        { useFindAndModify: false },
        function (err, doc) {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }
            else { 
                // console.log("Updated User Favorites!"); 
                return res.status(200).json({ success: true })
            }
        });
}
removeFromUserFavorites = async (req, res) => {
    // console.log("removeFromUserFavorites!")
    let email = req.params.email
    let favoritId = req.params.favoritId
    // console.log("email--" + email)
    // console.log("favoritId--" + favoritId)
    User.findOneAndUpdate({ email: req.params.email },
        { $pull: { favorites: favoritId } },
        { useFindAndModify: false },
        function (err, doc) {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }
            else { 
                // console.log("Updated User Favorites!"); 
                return res.status(200).json({ success: true })
            }
        });
}


updateUserName = async (req, res) => {
    // console.log("updateUserName!")
    User.findOneAndUpdate({ email: req.params.email },
        { $set: { name: req.params.name } },
        { useFindAndModify: false },
        function (err, doc) {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }
            else { 
                // console.log("Updated User Name!"); 
                return res.status(200).json({ success: true })
            }
        });
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    // getUserById,
    getUserByName,
    addImageToUser,
    getUserFavorites,
    addToUserFavorites,
    removeFromUserFavorites,
    updateUserName,
}