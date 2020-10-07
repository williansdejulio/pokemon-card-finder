import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/card-list', pathMatch: 'full' },
  { path: 'card-list', component: CardListComponent },
  { path: 'card-details/:id', component: CardDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
