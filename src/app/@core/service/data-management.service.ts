import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {

  public DataLoaded$: EventEmitter<any> = new EventEmitter();
  componentName: string;

  constructor(private userService: UserService) {

  }
  checkDataLoaded(): boolean {
    if (this.userService.users) {
      this.DataLoaded$.emit();
      return true;
    }
    return false;
  }


  loadData() {
    this.userService.loadAllUsers();
    this.userService.UserLoaded$.subscribe(res => {
      this.checkDataLoaded();
    });
  }
}
