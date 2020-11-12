import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth:{
        uid:'TESTING'
    }
});

describe('test en notes.js', () => {
    test('should to create new note', async() => {
        
        await store.dispatch(startNewNote());

        const actions  = store.getActions();

        // console.log(actions);
        expect(actions[0]).toEqual({
            type:types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)

            }

        });
        expect(actions[1]).toEqual({
            type:types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)

            }  
            
        });
        const docId =  actions[1].payload.id;
       
            // const docId...action...payload....id
            //await ....db ...doc('').....delete();
            await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    })
    
})
