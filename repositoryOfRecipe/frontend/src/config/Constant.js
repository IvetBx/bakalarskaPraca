export const recipesURL = "http://localhost:8080/recipes";
export const URL = "http://localhost:8080";

export const categories = ["", "Appetizer", "Breakfast", "Beverages", "Dessert", "Main course", "Salad", "Side dish",
"Snacks", "Soup", "Vegetarian", "Vegan", "Raw", "Sandwiches", "Sauces", "Seafood",
"Easy Dinners", "Camping Recipes"]

export const units = ["","tablespoon", "teaspoon", "piece", "cup", "cloves", 
"pinch", "pound", "gram", "kilogram", "litre", "mililitre", "decilitre", 
"bowl", "to taste", "can"]

export const dbRecipes = "http://localhost:3030/myFirstRecipes#"
export const dbUsers = "http://localhost:3030/users#"
export const urlOntology = "http://www.st.fmph.uniba.sk/~balintova37/ontology/finalOntologyAboutRecipe.owl#"
export const urlFOAF = "http://xmlns.com/foaf/0.1/"
export const urlLabel = "http://www.w3.org/2000/01/rdf-schema#label"
export const urlMember = "https://www.w3.org/2000/01/rdf-schema#rdfs:ContainerMembershipProperty"

export const structureOfhasCookTime = {
    months:0,
    hours:"",
    minutes:"",
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

export const structureOfhasIngredient = { 
    uri : dbRecipes + "ing" + new Date().getTime(),
    label: "", 
    hasFood:structureOfWikidataEntity,
    hasQuantity: {
        uri: dbRecipes + "mass" + + new Date().getTime(),
        hasMetricQuantity:"",
        hasCount:""
    }
}

export const structureOfLiOfhasInstruction = {
        uri: dbRecipes + "ins" + new Date().getTime(),
        label:"",
        hasInstructions: {
            uri:dbRecipes + "subsequence" + new Date().getTime(),
            li:[
                //uri:dbRecipes + "sub" + new Date().getTime(),
                //hasDescription:""
            ]
        },
        hasIngredient:[],
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
        uri: dbRecipes + "seq" + new Date().getTime(),
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
    belongsToCuisine:[structureOfWikidataEntity],
    hasDescription:"",
    requiresEquipment:[structureOfWikidataEntity],
    usingMethod:[structureOfWikidataEntity]
  }
