export const recipesURL = "http://localhost:8080/recipes";
export const URL = "http://localhost:8080";

export const categories = ["", "Appetizer", "Breakfast", "Beverages", "Dessert", "Main course", "Salad", "Side dish",
"Snacks", "Soup", "Vegetarian", "Vegan", "Raw", "Sandwiches", "Sauces", "Seafood",
"Easy Dinners", "Camping Recipes"]

export const units = ["","tablespoon", "teaspoon", "piece", "cup", "cloves", 
"pinch", "pound", "gram", "kilogram", "litre", "mililitre", "decilitre", 
"bowl", "to taste"]

export const dbRecipes = "http://localhost:3030/myFirstRecipes#"

export const structureOfhasCookTime = {
    months:0,
    hours:0,
    minutes:0,
    years:0,
    days:0,
    seconds:0,
    fullSeconds:0,
    timePart:0,
    bigSeconds:0
  }

export const structureOfWikidataEntity = {
    uri:"",
    label:""
}

export const structureOfhasIngredient = { uri:"" + + Math.random(),
    label: "", 
    hasFood:structureOfWikidataEntity,
    hasQuantity: {
        uri:"",
        hasMetricQuantity:"",
        hasCount:""
    }
}


export const structureOfLiOfhasInstruction = 
        {
        label:"",
        hasInstructions:"",
        hasIngredient:[ structureOfhasIngredient],
        produces:structureOfWikidataEntity,
        usingMethod:[structureOfWikidataEntity],
        requiresEquipment:[structureOfWikidataEntity],
        hasEndPoint:"",
        hasCookTime:structureOfhasCookTime,
        hasDescription:"",
        needsTemperature:""
    }

export const structureOfRecipe = {
    uri: dbRecipes + new Date().getTime(),
    label:"",
    produces: structureOfWikidataEntity,
    hasInstructions:{
        uri:"",
        li: [structureOfLiOfhasInstruction]
    },
    hasAuthor:{
        uri: "",
        username:"",
        password:""
    },
    hasIngredient:[structureOfhasIngredient],
    hasCookTime: structureOfhasCookTime,
    hasNumberOfPortions:"",
    belongsToCategory:[""],
    belongsToCuisine:[{uri:"", label:""}],
    hasDescription:"",
    requiresEquipment:[structureOfWikidataEntity],
    usingMethod:[structureOfWikidataEntity]
  }
