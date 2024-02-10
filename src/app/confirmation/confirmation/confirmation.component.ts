import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from '../../@core/service/confirmation.service';

@Component({
  selector: 'ngx-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

  token: string;
  activated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    // Capture the token from the route parameters
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.confirmationService.confirmation(this.token).subscribe(confirmation => {
        this.activated = true;
      });
    });
  }

}
