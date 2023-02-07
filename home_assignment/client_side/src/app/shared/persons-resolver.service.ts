import { PersonsService } from './../persons/persons.service';
import { Person } from './../persons/person.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class PersonsResolverService implements Resolve<Person[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private personsService: PersonsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const perssons = this.personsService.getPersons();

    if (perssons.length === 0) {
      return this.dataStorageService.fetchPersons();
    } else {
      return perssons;
    }
  }
}
