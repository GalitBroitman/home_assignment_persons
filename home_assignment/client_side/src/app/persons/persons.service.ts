import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  personsListChanged  = new Subject<Person[]>();

  private persons: Person[] = [];

  constructor() { }

  setPersons(persons: Person[] ) {
    this.persons = persons;
    this.personsListChanged.next(this.persons.slice());
  }

  getPersons() {
    return this.persons.slice();
  }

  addPerson(person: Person) {
    this.persons.push(person);
    this.personsListChanged.next(this.persons.slice());
  }

  updatePerson(newPerson: Person ) {
    this.persons = this.persons.map((person: Person) => person.id === newPerson.id ? newPerson : person);
    this.personsListChanged.next(this.persons.slice());
  }

  deletePerson(id: string) {
    this.persons = this.persons.filter((person: Person) => person.id !== id);
    this.personsListChanged.next(this.persons.slice());
  }
}
