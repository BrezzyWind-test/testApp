export interface AppUser {
  id: number;
  firstName: string;
  name: string;
  lastName?: string;
  dateRegistration: string;
  age: string;
  password: string;
  login: string;
}

export class AppUser implements AppUser {
  constructor() {
    this.id = NaN;
    this.firstName = '';
    this.name = '';
    this.lastName = '';
    this.dateRegistration = '';
    this.age = '';
    this.login = '';
    this.password = '';
  }
}
