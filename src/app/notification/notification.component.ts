import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationCount = 0;

  ngOnInit(): void {
    // Perform initialization logic here
    // For example, increase the notificationCount
    this.notificationCount += 1;
    console.log(this.notificationCount)
    localStorage.setItem("notificationStatus", "Notification Checked");

    // You can also fetch initial data or perform other setup tasks
  }
}
