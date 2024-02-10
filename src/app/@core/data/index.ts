export class Category {
  id: number;
  title: string;
  titleArabe: string;
  superviserUser: User[];
  createdDate: Date;
}
export class SousCategory {
  id: number;
  title: string;
  titleArabe: string;
  createdDate: Date;
  supervisorUser: User;
  category: Category;
}export class ResetData {
  password: string;
  token: string;
  repeatPassword: string;
  constructor() {
    this.token = '';
    this.password = '';
    this.repeatPassword = '';
  }
}
export class Status {
  id: number;
  title: string;
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
  region: Region;
}
export class Authorities {
  id: number;
  name: string;
  label: string;
}
export class Ticket {
  id: number;
  createdDate: Date;
  title: String;
  description: String;
  user: User;
  assignedUser: User;
  superviserUser: User;
  ticketMessages: TicketMessages[];
  latitude: number;
  longitude: number;
}
export class TicketMessages {
  id: number;
  createdDate: Date;
  content: string;
  user: User;
}

export class Region {
  id: number;
  name: String;
}

export class News {
  id: Number;
  title: String;
  content: String;
  img: String;
  region: Region;
}
