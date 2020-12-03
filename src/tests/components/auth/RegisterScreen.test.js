import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store"; //ES6 modules
import {MemoryRouter} from 'react-router-dom';
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }};



const store = mockStore(initState);



const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
)




describe('pruebas en RegistrerScreen', () => {
     
    
    test('debe de nostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change',{
            target:{
                value:'',
                name:'email'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:types.uiSetError,
            payload:'email is not valid'
        })
    });

    test('debe de mostrar la caja de alerta con error', () => {
        
        const initState = {
            auth:{},
            ui:{
                loading:false,
                msgError: 'email no es correcto'
            }
        };
        
        const store = mockStore(initState);
        
        
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        )

      

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    })
    
    
    
})
