import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
const { login, logout, startLogout, startLoginEmailPassword} = require("../../actions/auth");
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

        expect(actions[0]).toEqual({type:types.logout});
        expect(actions[1]).toEqual({type:types.notesLogoutClean});
    
    });

    test('should to start the starloginwhithemailand password', async() => {
        
        await store.dispatch(startLoginEmailPassword('test@testing.com','residentevil6'));

        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type:types.login,
            payload:{
                 uid: 'JneheI4F4Da46BN7pnGl8Me6k6g2',
                 displayName:null,
            }
        })
        

    });
  
})
