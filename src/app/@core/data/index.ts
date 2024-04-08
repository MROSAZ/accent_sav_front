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
  backupRef: ComponentsBackup[];
  category: Category;
  quantity: number;
}

export class ProdHistorique {
  id: number;
  model: string;
  dateProd: Date;
  card: number;
}
export class ComponentQuantity {
  id: number;
  historiqueMaintenance: HistoriqueMaintenance;
  component: Components;
  quantity: number;
}

export class HistoriqueMaintenance {
  id: number;
  card: Cards;
  componentQuantities: ComponentQuantity[];
  dateMaintenance: Date;
}

export class ComponentsBackup {
  id: number;
  reference: string;
  value: number;
  backupRef: Components;
  category: Category;
}

export class CardModel {
  id: number;
  model: string;
  modelComponents: ModelComponent[];
}

export class ModelComponent {
  id: number;
  cardModel: CardModel;
  component: Components;
  quantity: number;

}

export class Client {
  id: number;
  email: string;
  name: string;
}

export class Production {
  id: number;
  cards: Cards[];
  dateProduction: Date;
}

export class Authorities {
  id: number;
  name: string;
  label: string;
}

export class Cards {
  id: number;
  imei: string;
  numSerie: string;
  addDate: Date;
  buyDate: Date;
  cardModel: CardModel;
  client: Client;
  production: Production;
}
export class CardsAddDto {
  cards: Cards[];
  cardModel: CardModel;
}
export class CardsStock {
  model: string;
  stock: number;
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
