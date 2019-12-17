const express = require('express')

const RecipeCtrl = require('../controllers/recipe-ctrl')

const router = express.Router()

//all the CRUD operations for the REST endpoints
router.post('/recipe', RecipeCtrl.createRecipe)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes)
router.get('/getPageRecipes/:numInPage/:skip', RecipeCtrl.getPageRecipes)
router.get('/getNumOfRecipes', RecipeCtrl.getNumOfRecipes)
router.get('/getNumOfRecipesWithCategory/:str', RecipeCtrl.getNumOfRecipesWithCategory)

router.get('/getRecipeByName/:str', RecipeCtrl.getRecipeByName)
router.get('/getRecipeByCategory/:str', RecipeCtrl.getRecipeByCategory)
router.get('/getPageRecipesWithCategory/:numInPage/:skip/:str', RecipeCtrl.getPageRecipesWithCategory)

module.exports = router