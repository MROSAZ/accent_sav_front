import {Authorities} from '../@core/data';

export class Credentials {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}

export class User {
  id: number;
  username: string;
  name: string;
  date: Date;
  rawPassword: string;
  email: string;
  token: string;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  authorities: Authorities[];
}

