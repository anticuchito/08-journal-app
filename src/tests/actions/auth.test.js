import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import createMockStore from "redux-mock-store";
const { login, logout, startLogout} = require("../../actions/auth");
const { types } = require("../../types/types");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('test whit acction of  auth', () => {

    beforeEach(()=>{
        store = mockStore(initState);
    })

    test('login and logout should to creat the action respective', () => {
       const  loginAction = login('123','miguel');
       const logoutAction = logout();

       expect(loginAction).toEqual({
           type:types.login,
           payload:{
               uid:'123',
               displayName:'miguel'
           }
       });
       expect(logoutAction).toEqual({type:types.logout});
    });

    test('should to realize to logout', async() => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        console.log(actions);



    });
    
    
})
