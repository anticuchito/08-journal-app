import { types } from "../types/types";


/*
    {
        uid:'fasdasdasdad123123123,
        name:'fernando'
    }

*/
export const authReducer = (state={}, action) => {
    switch (action.type ) {
        case types.login:
            return{
                uid:action.payload.uid,
                name:action.payload.displayName
            }
            
            case types.logout:
                return{}    
    
        default:
            return state;
    }
}
