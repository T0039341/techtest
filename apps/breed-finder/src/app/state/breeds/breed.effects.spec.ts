import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { BreedEffects } from './breed.effects';
import { BreedService } from './breed.service';
import {
  getBreedDetails,
  getBreedDetailsSuccess,
  getBreedList,
  getBreedListFailure,
  getBreedListSuccess,
} from './breed.actions';
import { BreedDetails } from './breed.model';

describe('CourseProgressEffects', () => {
  let actions: Observable<unknown>;
  let effects: BreedEffects;
  let service: BreedService;
  let store: MockStore;

  const mockBreedList: BreedDetails[] = [
    {
      name: "Pomeranian",
      description: "Pomeranians are lively, intelligent, and extroverted dogs. They have a thick double coat and are known for their small size and fluffy appearance.",
      size: "Small",
      origin: "Germany",
      lifeExpectancy: "12-16 years",
      temperament: ["Playful", "Friendly", "Active"],
      image: "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-08/Pomeranian.jpg?itok=QvLRcTeg"
    },
    {
      name: "Poodle",
      description: "Poodles are highly intelligent and trainable dogs. They come in three sizes: standard, miniature, and toy. Poodles are known for their curly, hypoallergenic coats.",
      size: "Varies (Standard, Miniature, Toy)",
      origin: "Germany",
      lifeExpectancy: "10-18 years",
      temperament: ["Intelligent", "Active", "Alert"],
      image: "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-08/Poodle.jpg?itok=w2uN_2dF"
    },
    {
      name: "Rottweiler",
      description: "Rottweilers are powerful, confident, and loyal dogs. They have a distinctive black and tan coat and are known for their strength and protective instincts.",
      size: "Large",
      origin: "Germany",
      lifeExpectancy: "8-10 years",
      temperament: ["Loyal", "Confident", "Courageous", "Protective"],
      image: "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-08/Rottweiler.jpg?itok=6lA0l2Qr"
    }
  ];

  const mockBreedDetail: BreedDetails = {
    name: "Pomeranian",
    description: "Pomeranians are lively, intelligent, and extroverted dogs. They have a thick double coat and are known for their small size and fluffy appearance.",
    size: "Small",
    origin: "Germany",
    lifeExpectancy: "12-16 years",
    temperament: ["Playful", "Friendly", "Active"],
    image: "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-08/Pomeranian.jpg?itok=QvLRcTeg"
  };
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedEffects,
        provideMockStore(),
        provideMockActions(() => actions),
        {
          provide: BreedService,
          useValue: {
            getBreedList: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(BreedService);
    effects = TestBed.inject(BreedEffects);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBreedList$', () => {
    describe('when the service returns successful', () => {
      it('should dispatch getBreedListSuccess', () => {
        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-a', { a: mockBreedList });
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListSuccess({ breeds: mockBreedList }) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });
  });

  describe('getBreedDetails$', () => {
    describe('when the service returns successful', () => {
      it('should dispatch getBreedDetailsSuccess', () => {
        const breedName = 'Pomeranian';
        actions = hot('-a', { a: getBreedDetails({ breedName: breedName }) });

        const serviceResponse = cold('-a', { a: mockBreedDetail });
        service.getBreedDetails = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedDetailsSuccess({ breed: mockBreedDetail }) });

        expect(effects.getBreedDetails$).toBeObservable(expected);
        expect(service.getBreedDetails).toHaveBeenCalled();
      });
    });

    describe('when the service returns an error', () => {
      it('should dispatch getBreedListFailure', () => {
        const error = new Error('oops');

        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-#|', {}, error);
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListFailure({error}) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });
  });
});
