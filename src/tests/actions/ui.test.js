const { setError ,removeError,startLoading,finishLoading } = require("../../actions/ui");
const { types } = require("../../types/types");

describe('test on ui-actions', () => {
    test(' all  acction should to work', () => {
        const action= setError('help!!!');

        expect(action).toEqual({
            type:types.uiSetError,
            payload:'help!!!'
        })

        const removeErrorAction =removeError();
        const startLoadingAction =startLoading();
        const finishLoadingAction =finishLoading();

        expect(removeErrorAction).toEqual({
            type:types.uiRemoveError
        });
        expect(startLoadingAction).toEqual({
            type:types.uiStartLoading
        });
        expect(finishLoadingAction).toEqual({
            type:types.uiFinishLoading
        });

    })
    
})
