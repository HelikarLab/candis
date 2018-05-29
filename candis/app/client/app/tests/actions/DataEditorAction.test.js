import ActionType from '../../constant/ActionType'
import { row, column } from '../../action/DataEditorAction'

test('should setup row.insert action object', () => {
    const action = row.insert(position = 1, row = 2)
    expect(action).toEqual({
        type: ActionType.DataEditor.INSERT_ROW,
        payload: { position: position, row: row }
    })
})

test('should setup row.select action object', () => {
    const action = row.select()
    expect(action).toEqual({
        type: ActionType.DataEditor.SELECT_ROW,
        payload: 
    })
})

test('should setup row.update action object', () => {
    const action = row.update()
    expect(action).toEqual({
        type: ActionType.DataEditor.UPDATE_ROW,
        payload: 
    })
})

test('should setup row.deselect action object', () => {
    const action = row.deselect()
    expect(action).toEqual({
        type: ActionType.DataEditor.DESELECT_ROW,
        payload: 
    })
})

test('should setup row.delete action object', () => {
    const action = row.delete()
    expect(action).toEqual({
        type: ActionType.DataEditor.DELETE_ROW,
        payload: ''
    })
})

test('should setup column.delete action object', () => {
    const action = column.insert()
    expect(action).toEqual({
        type: ActionType.DataEditor.INSERT_COLUMN,
        payload: 
    })
})

test('should setup column.delete action object', () => {
    const action = column.delete()
    expect(action).toEqual({
        type: ActionType.DataEditor.DELETE_COLUMN,
        payload: 
    })
})
