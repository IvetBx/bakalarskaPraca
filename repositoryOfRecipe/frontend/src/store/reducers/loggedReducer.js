const initState={
    signIn:false,
    userName:"Anonymous user",
    password:"",
    email:""
}


const loggedReducer=(state=initState, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                signIn:true,
                userName:action.userName,
                password:action.password,
                email:action.email
            }

        case "LOG_OUT":
            return {
                signIn:false,
                userName:"Anonymous user",
                password:"",
                email:""
            }

        default:
            return state
    }
}

export default counterReducer