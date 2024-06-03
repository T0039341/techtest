export interface BreedState {
  breedList: BreedDetails[]
  selectedBreed: BreedDetails
}

export interface BreedDetails {
  name: string;
  description: string;
  size: string;
  origin: string;
  lifeExpectancy: string;
  temperament: string[];
  image: string;
}