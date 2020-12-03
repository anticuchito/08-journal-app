import React from "react";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; //ES6 modules
import { MemoryRouter } from "react-router-dom";

import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import {firebase} from '../../firebase/firebase-config';
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "react-dom/test-utils";

const { mount } = require("enzyme");

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
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
        id:'123',
        body: 'test',
        title: 'test',
    }
  }};

let store = mockStore(initState);
store.dispatch = jest.fn();

// const wrapper = mount(
//     <Provider store={store}>
//         <MemoryRouter>
//             <AppRouter />
//         </MemoryRouter>
//     </Provider>
//     )

describe("Pruebas en  <AppRouter />", () => {
  test("should to call the login if is athenticated", async () => {
    await act(async() => {
        
        const userCred =await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456')
        // user = userCred.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith("C3rAmLIruHXRGVYZB48bsQ3Rcuy1",null);
  });
});
