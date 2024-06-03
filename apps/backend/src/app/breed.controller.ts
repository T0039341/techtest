import { Controller, Get, Param } from '@nestjs/common';
import { BreedService } from './breed.service';
import { Breed } from './breed.model';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  getAllBreeds(): Breed[] {
    return this.breedService.getAllBreeds();
  }

  @Get(':name')
  getBreedDetails(@Param('name') name: string): Breed {
    return this.breedService.getBreedDetails(name);
  }
}
