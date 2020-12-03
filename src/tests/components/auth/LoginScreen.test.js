import React from 'react';
import {Provider} from 'react-redux';
import configureStore from "redux-mock-store"; //ES6 modules
import {MemoryRouter} from 'react-router-dom';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { startGoogleLogin,startLoginEmailPassword } from '../../../actions/auth';
const { mount } = require("enzyme")
const { LoginScreen } = require("../../../components/auth/LoginScreen")
jest.mock('../../../actions/auth',() => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword :jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);




const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }

};



let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>   
    </Provider>
    )


describe('pruebas en loginScreen', () => {

    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {
       expect(wrapper).toMatchSnapshot();
    })
    
    test('debe disparar la acion StartGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe de disparar start login con los respectivos argumentos ', () => {
        wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
        });
        expect(startLoginEmailPassword).toHaveBeenCalledWith('','')
    })
    
    
})
