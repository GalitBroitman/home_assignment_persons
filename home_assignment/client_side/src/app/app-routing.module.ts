import { PersonsListComponent } from './persons/persons-list/persons-list.component';
import { AddPersonComponent } from './add-person-form/add-person/add-person.component';
import { PersonsResolverService } from './shared/persons-resolver.service';
import { PersonsComponent } from './persons/persons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  {
    path: 'persons',
    component: PersonsComponent,
    children: [
      {
        path: ':id',
        component: PersonsListComponent,
        resolve: [PersonsResolverService]
      }
    ],
    resolve: [PersonsResolverService]
  },
  {
    path: 'add-person',
    component: AddPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
