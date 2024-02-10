import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../@core/service/notifications.service';

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notification: any[]  = [];
  constructor(
    private notificationService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.notificationService.findNotificationByUserId(Number(localStorage.getItem('id')))
      .subscribe(notifications => {
        // Create a new array with updated status
        const updatedNotifications = notifications.map(notification => {
          const updatedNotification = { ...notification, status: 1 };
          // Update the notification using the service
          this.notificationService.updateNotification(updatedNotification).subscribe();
          return updatedNotification;
        });
        // Sort the new array
        this.notification = notifications.sort((a, b) => b.id - a.id);
        this.notificationService.findUnreadNotificationByIdUser(Number(localStorage.getItem('id')))
          .subscribe(unread => {
          this.notificationService.numberUnreadNotification = unread;
        });
      });
  }

}
