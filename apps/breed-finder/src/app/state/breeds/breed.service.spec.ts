import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BreedService } from './breed.service';
import { BreedDetails } from './breed.model';

describe('BreedService', () => {
  let service: BreedService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

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
      imports: [HttpClientTestingModule],
      providers: [BreedService]
    });

    service = TestBed.inject(BreedService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreedList', () => {
    it('should call http get', () => {
      service.getBreedList().subscribe((breedList) => {
        expect(breedList).toEqual(mockBreedList);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/api/breed');
      expect(req.request.method).toEqual('GET');
      req.flush(mockBreedList);
    });
  });

  describe('getBreedDetails', () => {
    it('should call http get', () => {
      const breedName = 'Pomeranian';
      service.getBreedDetails(breedName).subscribe((breedDetail) => {
        expect(breedDetail).toEqual(mockBreedDetail);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/api/breed/${breedName}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockBreedDetail);
    });
  });
});
