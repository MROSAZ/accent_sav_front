export class Category {
  id: number;
  category: string;
  measurementUnit: string;
  components: Components[];
}
export class Components {
  id: number;
  reference: string;
  value: number;
  backup: Boolean;
  backupRef: Components[];
  backupFor: Components;
  category: Category;
}
export class Authorities {
  id: number;
  name: string;
  label: string;
}
export class User {
  id: number;
  firstname: string;
  lastname: string;
  date: string;
  username: string;
  rawPassword: string;
  email: string;
  authorities: Authorities[];
}
export class ResetData {
  password: string;
  token: string;
  repeatPassword: string;
  constructor() {
    this.token = '';
    this.password = '';
    this.repeatPassword = '';
  }
}
