import { createFeature, createReducer, on } from '@ngrx/store';
import { BreedState, BreedDetails } from './breed.model';
import { getBreedListSuccess, getBreedDetailsSuccess } from './breed.actions';

export const initialState: BreedState = {
  breedList: [] as BreedDetails[],
  selectedBreed: {} as BreedDetails
};

export const breedReducer = createFeature({
  name: 'breedState',
  reducer: createReducer(
    initialState,
    on(getBreedListSuccess, (state, { breeds }) => ({
      ...state,
      breedList: breeds,
    })),
    on(getBreedDetailsSuccess, (state, { breed }) => {
      return {
        ...state,
        selectedBreed: breed,
      };
    })
  ),
});


