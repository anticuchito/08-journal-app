





import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";


const { mount } = require("enzyme");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes',() => ({
   activeNote:jest.fn(),
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
      active:{
          id:'1234',
          title:'hola,',
          body:'mundo',
          date:0
      }
  }};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
        <Provider store={store}>
                <NoteScreen />
        </Provider>
);



describe('test en <NoteScreen />', () => {
    
    test('debe de hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value: 'test'
            }
        });
        expect(activeNote).toHaveBeenLastCalledWith('1234',{
            body:'mundo',
            title:'test',
            id:'1234',
            date:0
        })
    })
    
    
})
