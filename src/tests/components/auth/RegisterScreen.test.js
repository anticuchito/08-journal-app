import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store"; //ES6 modules
import {MemoryRouter} from 'react-router-dom';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';




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
// store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
)




describe('pruebas en RegistrerScreen', () => {
     
    beforeEach(()=>{
        store = mockStore(initState);
    })

    test('debe de nostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de hacer el dispach de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.prop('onChange',{
            target:{
                value:'',
                name:'email'
            }
        });

        wrapper.find('form').prop('onSubmit')(
            {
                preventDefault(){}
            }
        );

        const actions = store.getActions();
        console.log(actions);
    })
    
    
})
