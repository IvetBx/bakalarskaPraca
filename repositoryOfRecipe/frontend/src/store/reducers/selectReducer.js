const initState={
    minTime:null,
    maxTime:null, 
    optionalTime:true,
    minRating:1,
    maxRating:5,
    optionalRating:true,
    inAuthors:[], 
    exAuthors:[],
    inCategories:[],
    exCategories:[],
    inMethods:[],
    exMethods:[],
    inCuisines:[],
    exCuisines:[],
    inKitchenware:[],
    exKitchenware:[],
    inIngredients:[], 
    exIngredients:[]
}

const selectReducer=(state=initState, action) => {
    switch(action.type){
        case "SAVE_TIME":
            return {
                ...state,
                minTime:action.minTime,
                maxTime:action.maxTime, 
                optionalTime:action.optionalTime
            }

        case "SAVE_RATING":
            return {
                ...state,
                minRating:action.minRating,
                maxRating:action.maxRating,
                optionalRating:action.optionalRating
            }

        case "SAVE_AUTHORS":
            return {
                ...state,
                inAuthors:action.inAuthors, 
                exAuthors:action.exAuthors
            }

        case "SAVE_CATEGORIES":
            return {
                ...state,
                inCategories:action.inCategories,
                exCategories:action.exCategories
            }

        case "SAVE_METHODS":
            return {
                ...state,
                inMethods:[],
                exMethods:[]
            }
            
        case "SAVE_CUISINES":
            return {
                ...state,
                inCuisines:action.inCuisines,
                exCuisines:action.exCuisines
            }

        case "SAVE_KITCHENWARE":
            return{
                ...state,
                inKitchenware:action.inKitchenware,
                exKitchenware:action.exKitchenware
            }

        case "SAVE_INGREDIENTS":
            return {
                ...state,
                inIngredients:action.inIngredients, 
                exIngredients:action.exIngredients
            }
        
        case "REMOVE_FILTER":
            return {
                minTime:null,
                maxTime:null, 
                optionalTime:true,
                minRating:1,
                maxRating:5,
                optionalRating:true,
                inAuthors:[], 
                exAuthors:[],
                inCategories:[],
                exCategories:[],
                inMethods:[],
                exMethods:[],
                inCuisines:[],
                exCuisines:[],
                inKitchenware:[],
                exKitchenware:[],
                inIngredients:[], 
                exIngredients:[]
            }
        
        default:
            return state
    }
}

export default selectReducer