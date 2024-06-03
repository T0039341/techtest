import { Injectable, NotFoundException } from '@nestjs/common';
import { Breed } from './breed.model';
import breedList from '../assets/breed-list.json';

@Injectable()
export class BreedService {
  private readonly breeds: Breed[] = breedList;

  getAllBreeds(): Breed[] {
    const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList))
    return breedInfos;
  }

  getBreedDetails(breedName: string): Breed {
    const breed = this.breeds.find((b) => b.name.toLowerCase() === breedName.toLowerCase());
    if (!breed) {
      throw new NotFoundException('The breed is not found!!');
    }
    return breed;
  }
}
