import * as actionTypes from '../actions/actions'

const initalState = {
    user: null
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.STORE_USER:
            return {
                ...state,
                user: action.user
            }

        case actionTypes.DELETE_USER:
            return {
                ...state,
                user: null
            }
        }

        return state
}

export default reducer