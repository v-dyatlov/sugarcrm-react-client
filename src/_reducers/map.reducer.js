import { mapConstants } from '../_constants';

export function map(state = {}, action) {
    switch (action.type) {
        case mapConstants.MAP_REQUEST:
            return {
                loading: true,
                accounts: []
            };
        case mapConstants.MAP_SUCCESS:
            return {
                ...state,
                accounts: [...state.accounts, action.account],
                loading: false
            };
        case mapConstants.MAP_FAILURE:
            return {};
        default:
            return state
    }
}