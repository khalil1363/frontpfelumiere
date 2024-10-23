import { Component, ElementRef, OnInit, AfterViewInit,  ViewChild, Renderer2 } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { Role } from '../enum/role';

declare const bx: any; 


@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent  implements AfterViewInit , OnInit{

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  sidebarVisible: boolean = true;
  public connectedUser : User ;

   constructor(private renderer: Renderer2, private el: ElementRef , private router : Router  , 
               private authenticationService :AuthenticationService , private notificationService : NotificationService) {}

  ngOnInit(): void {
    this.connectedUser=this.authenticationService.getUserFromLocalCache();
    
  }
  
  ngAfterViewInit() {
    const arrowElements = this.el.nativeElement.querySelectorAll('.arrow');
    arrowElements.forEach((arrowElement: any) => {
      this.renderer.listen(arrowElement, 'click', () => {
        const arrowParent = arrowElement.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');
      });
    });
  }
  
 

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
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

 /////

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }
  public get issuperadmin(): boolean {
    return this.getUserRole() === Role.SUPERADMIN;
  }
  public get isAdminOrHR() : boolean {
    return this.isRHFormation || this.isAdmin || this.issuperadmin;
  }






  public get dashbord():boolean {
    return this.isAdmin || this.isRHFormation || this.isRHRecrutement || this.issuperadmin
  }
  

  public get formation():boolean {
    return  this.isRHFormation ||  this.issuperadmin || this.isUser
  }
  public get chauffeur():boolean {
    return  this.isRHChauffeur || this.issuperadmin
  }

  public get recretement():boolean {
    return  this.isRHRecrutement || this.issuperadmin || this.isUser
  }
  public get vesitemedicale():boolean {
    return  this.isRHVisiteMedicale || this.issuperadmin
  }

  public get  administration():boolean {
    return  this.isAdmin || this.issuperadmin
  }



















  public get isUser(): boolean {
    return this.getUserRole() === Role.USER;
  }
 
  public get isRHFormation(): boolean {
    return this.getUserRole() === Role.RHFORMATION;
  }
  
  public get isRHRecrutement(): boolean {
    return this.getUserRole() === Role.RHRECRETEMENT;
  }
  
  public get isRHChauffeur(): boolean {
    return this.getUserRole() === Role.RHCHAUFFEUR;
  }
  
  public get isRHVisiteMedicale(): boolean {
    return this.getUserRole() === Role.RHVISITEMEDICALE;
  }


 
  
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
  


  

}
