import { Route } from '@angular/router';
import { OverviewPageComponent } from './overview/overview.page';
import { BreedDetailsComponent } from './details/breed-details.component';

export const appRoutes: Route[] = [
  { path: '', component: OverviewPageComponent },
  { path: ':breed', component: BreedDetailsComponent }
];
