import React from 'react'
import {Provider} from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const JournalApp = () => {
    return (// como AppRouter es un high order component hay que llamarlo para que funcionen los path
        <Provider store={store}>
            <AppRouter /> 
        </Provider>
    )
}
