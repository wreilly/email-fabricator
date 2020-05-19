import {ActionReducerMap, createSelector, createFeatureSelector} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';

export interface MyOverallState {
    ui: fromUi.MyState;
}

export const reducers: ActionReducerMap<MyOverallState> = {
    ui: fromUi.UIReducer,
};



export const getUiState = createFeatureSelector<fromUi.MyState>('ui');
export const getIsSidenavOpen = createSelector(getUiState, fromUi.getIsSidenavOpen);
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
