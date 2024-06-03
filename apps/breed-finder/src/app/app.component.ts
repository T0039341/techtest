import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderPageComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getBreedList } from './state/breeds/breed.actions';

@Component({
  standalone: true,
  imports: [
    HeaderPageComponent,
    RouterModule,
    HttpClientModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {

  }

  ngOnInit(): void {
      this.store.dispatch(getBreedList())
  }
}
