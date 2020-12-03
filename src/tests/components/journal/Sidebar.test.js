import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { SideBar } from "../../../components/journal/SideBar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

const { mount } = require("enzyme");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth',() => ({
   startLogout:jest.fn(),
}));

jest.mock('../../../actions/notes',() =>({
    startNewNote:jest.fn(),
    noteLogout:jest.fn()
}));


const initState = {
  auth: {
      uid:'123',
      name:'miguel'
 },
  ui: {
    loading: false,
    msgError: null,
  },
  notes:{
    notes:[{
        id:'123',
        body: 'test',
        title: 'test',
    }],
      active:null
  }};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
        <Provider store={store}>
                <SideBar />
        </Provider>
);


describe('pruebas en el <Sidebar />', () => {

    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    })


    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar logout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('debe de llamar la accion del startNewnote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    })
    
    
    
})
