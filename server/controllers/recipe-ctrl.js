const Recipe = require('../models/recipe-model')

createRecipe = (req, res) => {
    const body = req.body
    // console.log("createRecipe - body:",body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a recipe',
        })
    }

    const recipe = new Recipe(body)

    if (!recipe) {
        return res.status(400).json({ success: false, error: err })
    }

    recipe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: recipe._id,
                message: 'Recipe created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Recipe not created!',
            })
        })
}

updateRecipe = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Recipe not found!',
            })
        }
        recipe.name = body.name
        recipe.time = body.time
        recipe.rating = body.rating
        recipe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipe._id,
                    message: 'Recipe updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Recipe not updated!',
                })
            })
    })
}

deleteRecipe = async (req, res) => {
    await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }

        return res.status(200).json({ success: true, data: recipe })
    }).catch(err => console.log(err))
}

getRecipeById = async (req, res) => {
    await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipe })
    }).catch(err => console.log(err))
}

getRecipes = async (req, res) => {
    await Recipe.find({}, (err, recipes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    }).catch(err => console.log(err))
}


getPageRecipes = async (req, res) => {
    let num = Number(req.params.numInPage)
    let skip = Number(req.params.skip)
    await Recipe.find().sort({"name": 1}).limit(num).skip(skip)  
    .then((recipes) => {
        // console.log("getPageRecipes")
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    })
    .catch(error => {
        // console.log("getPageRecipes - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}


getPageRecipesWithCategory = async (req, res) => {
    let num = Number(req.params.numInPage)
    let skip = Number(req.params.skip)
    let str = req.params.str
    // console.log("getRecipeByCategory - str:",str)
    await Recipe.find( { 'categories' : { '$regex' : str, '$options' : 'i' } } )
    .limit(num).skip(skip).sort({"name": 1})
    // await Recipe.find().limit(num).skip(skip).sort({"name": 1})    
    .then((recipes) => {
        // console.log("getPageRecipes")
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    })
    .catch(error => {
        // console.log("getPageRecipes - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}

getNumOfRecipes = async (req, res) => {
    // console.log("getNumOfRecipes")
    await Recipe.find({}).countDocuments()    
    .then((num) => {
        // console.log("getNumOfRecipes")        
        return res.status(200).json({ success: true, data: num })
    })
    .catch(error => {
        // console.log("getNumOfRecipes - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}


getNumOfRecipesWithCategory = async (req, res) => {
    // console.log("getNumOfRecipes")
    let str = req.params.str
    // console.log("getRecipeByCategory - str:",str)
    await Recipe.find( { 'categories' : { '$regex' : str, '$options' : 'i' } } )
    .countDocuments()  
    // await Recipe.find({}).countDocuments()    
    .then((num) => {
        // console.log("getNumOfRecipes")        
        return res.status(200).json({ success: true, data: num })
    })
    .catch(error => {
        // console.log("getNumOfRecipes - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}

getRecipeByName = async (req, res) => {
    let str = req.params.str
    // console.log("getRecipeByName - str:",str)
    await Recipe.find( { 'name' : { '$regex' : str, '$options' : 'i' } } ).sort({"name": 1})
    .then((recipes) => {
        // console.log("getRecipeByName")
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    })
    .catch(error => {
        // console.log("getRecipeByName - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}


getRecipeByCategory = async (req, res) => {
    let str = req.params.str
    // console.log("getRecipeByCategory - str:",str)
    await Recipe.find( { 'categories' : { '$regex' : str, '$options' : 'i' } } ).sort({"name": 1})
    .then((recipes) => {
        // console.log("getRecipeByCategory")
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    })
    .catch(error => {
        // console.log("getRecipeByCategory - error: ", error)
        return res.status(400).json({ success: false, error: error })
    })
}

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById,
    getPageRecipes,
    getNumOfRecipes,
    getNumOfRecipesWithCategory,
    getRecipeByName,
    getRecipeByCategory,
    getPageRecipesWithCategory
}