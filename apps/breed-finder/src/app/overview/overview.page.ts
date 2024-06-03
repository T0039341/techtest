import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BreedDetails } from '../state/breeds/breed.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, ButtonComponent],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss'],
})
export class OverviewPageComponent {
  breedList$: Observable<BreedDetails[]> = this.store.select(
    breedReducer.selectBreedList
  );

  constructor(private store: Store, private router: Router) {}

  goToDetails(breed: string) {
    this.router.navigateByUrl(breed);
  }
}
