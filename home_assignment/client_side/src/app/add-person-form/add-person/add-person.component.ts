import { Gender, Person } from './../../persons/person.model';
import { PersonsService } from './../../persons/persons.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit{

  newPersonForm!: FormGroup;
  id: string = '';

  constructor(private personsService: PersonsService,    
    private router: Router) {

  }
  ngOnInit(): void {
    this.initForm();
    this.id = uuidv4()
  }

  onSubmit() {
    const newPerson = {id:this.id, ...this.newPersonForm.value};
    this.personsService.addPerson(newPerson);
    this.onCancel();
  }

  onCancel() {
    // navigate to persons list page
    this.router.navigate(['/persons/', {id: this.id}]);
  }

  getEnumArray() {
    return Object.values(Gender);
  }

  private initForm() {
    let first_name = '';
    let last_name = '';
    let email = '';
    let address = '';
    let phone = '';
    let gender = Gender.MALE;

    this.newPersonForm = new FormGroup({
      first_name: new FormControl(first_name, Validators.required),
      last_name: new FormControl(last_name, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email]),
      address: new FormControl(address, Validators.required),
      phone: new FormControl(phone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      gender: new FormControl(gender, Validators.required)
      });
  }

}
