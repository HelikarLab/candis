import ActionType from '../../constant/ActionType'
import modal from '../../action/ModalAction'

test('should setup show action object', () => {
    const action = modal.show('')
    expect(action).toEqual({
        type: ActionType.Modal.SHOW,
        payload: ''
    })
})

test('should setup hide action object', () => {
    const action = modal.hide()
    expect(action).toEqual({
        type: ActionType.Modal.HIDE
    })
})

