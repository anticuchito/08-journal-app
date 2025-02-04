import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { startLoading, startNewNote, startSaveNote, startUploading } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";


jest.mock('../../helpers/fileUpload',()=>({
  fileUpload:jest.fn(()=>{
    return 'https://hola-mundo.com/cosa.jpg'
  })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes:{
    notes:[],
    active:{
        id:'2COSKhN9JhCsnmCNkmze',
        title:'hola',
        body:'Mundo'
    }
  }
};

let store = mockStore(initState);

describe("test en notes.js", () => {
  beforeEach(() => {
    // store.clearActions
    store = mockStore(initState);
  });

  test("should to create new note", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    // console.log(actions);
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    const docId = actions[1].payload.id;

    // const docId...action...payload....id
    //await ....db ...doc('').....delete();
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("should to loading the notes", async () => {
    await store.dispatch(startLoading("TESTING"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("should to refesh the note ", async() => {

    const note ={
        id:'2COSKhN9JhCsnmCNkmze',
        title:'titulo',
        body:'body'
    }

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    
    expect(actions[0].type).toBe(types.notesUpdated)

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

 test('startUploading should to update the url of the entry', async() => {
   
    const file = new File([],'foto.jpg');
    
    await store.dispatch(startUploading(file));
    
    const docRef = await db.doc('/TESTING/journal/notes/2COSKhN9JhCsnmCNkmze').get();

    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');

 })
 

});
