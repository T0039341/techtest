import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreedDetails } from './breed.model';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(private http: HttpClient) {}

  public getBreedList(): Observable<BreedDetails[]> {
    return this.http.get<BreedDetails[]>('http://localhost:3000/api/breed');
  }

  public getBreedDetails(breedName: string): Observable<BreedDetails> {
    return this.http.get<BreedDetails>(
      `http://localhost:3000/api/breed/${breedName}`
    );
  }
}
