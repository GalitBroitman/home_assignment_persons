
export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    POLYGENDER = 'Polygender',
    AGENDER  = 'Agender',
    GENDERQUEER = 'Genderqueer'
  }

export class Person {
    public id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public gender: Gender;
    public address: string;
    public phone: string;

    constructor(id: string,
                first_name: string ,
                last_name: string,
                email: string,
                gender: Gender,
                address: string,
                phone: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
    }


}