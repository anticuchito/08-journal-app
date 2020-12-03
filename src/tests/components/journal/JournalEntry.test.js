import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";


const { mount } = require("enzyme");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: "123",
    date:0,
    title:'Hola',
    body:'mundo',
    url:'https://something.com/photo.jpg'
};

const wrapper = mount(
        <Provider store={store}>
                <JournalEntry {...note}/>
        </Provider>
);






describe(' test en journal entry', () => {


    test('debe de crearce correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de activar la nota', () => {
    
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id,{...note})
        );
        
    })
    
    
})
