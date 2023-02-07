import { PersonsService } from './../persons.service';
import { Gender, Person } from './../person.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  subscription: Subscription = new Subscription;
  currentFilter!: string;
  selectedRows: string[] = [];
  focusedRowKey: string = '';
  autoNavigateToFocusedRow = true;

  id: string ='';


  constructor(private personService: PersonsService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // subscribe to get new list for any change
    this.subscription = this.personService.personsListChanged.subscribe(
      (persons: Person[]) => {
        this.persons = persons;
      }
    );
    this.persons = this.personService.getPersons();

    // get id if added new person to select its row
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.selectedRows = this.persons.filter((itemEl: Person) => itemEl.id === this.id).map((itemEL: Person) => itemEL.id);
    this.focusedRowKey = this.selectedRows? this.selectedRows[0] : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateRow(event: any) {
    this.personService.updatePerson(event.data);
  }

  removeRow(event: any) {
    this.personService.deletePerson(event.data.id);
  }

  getEnumArray() {
    return Object.values(Gender);
  }
  
}
