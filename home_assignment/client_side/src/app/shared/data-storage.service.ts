import { Person } from './../persons/person.model';
import { PersonsService } from './../persons/persons.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private apiURL = 'http://localhost:5000/persons';


  constructor(private http: HttpClient,
    private personsService: PersonsService) { }

  storePersons() {
    const persons = this.personsService.getPersons();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // server call for update all persons data in servers csv
    this.http.post(this.apiURL, persons, httpOptions).subscribe(
      (res: any) => {
        if (res['status'] === 201 && res['message'] === 'Persons added') {
          console.log('Persons added successfully');
        } else {
          console.error('Failed to add persons');
        }
      }
    );
  }

  fetchPersons() {
    // server call for get all persons data
   return this.http.get<Person[]>(this.apiURL)
    .pipe(
        tap( (persons: Person[]) => {
          this.personsService.setPersons(persons);
        }))
  }

  deletePerson(personId: string) {
    // server call for delete person
    this.http.delete(`${this.apiURL}/${personId}`).subscribe(
      (res: any) => {
        if (res['status'] === 200) {
          console.log('Person deleted successfully');
        } else {
          console.error('Failed to delete person');
        }
      }
    );
  }
}
