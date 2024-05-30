import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';
import { User } from './model/user';
import { NotificationType } from './enum/notification-type.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  
  public connectedUser : User ;
  showNavbar: boolean = true;
   constructor(private renderer: Renderer2, private el: ElementRef , private router : Router  , 
               private authenticationService :AuthenticationService , private notificationService : NotificationService) {}

  ngOnInit(): void {

    
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Check if the current URL is either '/' or '/acceuil'
          this.showNavbar = !(event.url === '' || event.url === '/acceuil');
        }
      });
    
    
  }
  
 
  


  public onLogOut() : void {
    this.authenticationService.lougOut() ;
    this.router.navigate(['/acceuil']) ;
    this.sendNotification(NotificationType.SUCCESS , `you have been Successfully Logout`) ;
  }


  private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
        this.notificationService.notify(notificationType,message) ;
      } else {
        this.notificationService.notify(notificationType, 'An error occure . please try again ');
      }
  }


  

}
