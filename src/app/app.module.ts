import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,  HTTP_INTERCEPTORS }  from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingComponent } from './setting/setting.component';
import { UniteFabricationComponent } from './unite-fabrication/unite-fabrication.component';
import {NgxPaginationModule} from 'ngx-pagination' ;
import{stageComponent} from './stage/stage.component';
import { ProfileComponent } from './profile/profile.component';
import { PicklisteComponent } from './pickliste/pickliste.component';
import { DashbordChartComponent } from './dashbord-chart/dashbord-chart.component' ;
import { NgChartsModule  } from 'ng2-charts';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { AcceuilPageComponent } from './acceuil-page/acceuil-page.component';
import {FormationComponent} from './formation/formation.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { StagierComponent } from './stagiaire/stagiaire.component';
import { placements } from '@popperjs/core';
import { Propositionformation } from './propositionformation/propositionformation.component';
import { PlanningComponent } from './planning/planning.component';
import { cabineComponent } from './chart/cabine/cabine.component';
import { DashbordFormationComponent } from './formationDashbord/DashbordFormation.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { typeformationComponent } from './chart/typeformation/typeformation.component';
import { actionreliseComponent } from './chart/actionrelise/actionrelise.component';
import { nbrhromponent } from './chart/nbr-hr/nbr-hr.component';
import { Candidat } from './model/Candidat';
import { CandidatComponent } from './Candidat/Candidat.component';
import { propositionOffresComponent } from './propositionOffres/propositionOffres.component';
import { offresEmploiComponent } from './offresEmploi/offresEmploi.component';
import { RecruitmentComponent } from './Recruitment/Recruitment.component';
import { txcomponent } from './chart/tx/tx.component';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { vesiteComponent } from './vesite/vesite.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    FormationComponent,
    SettingComponent,
    UniteFabricationComponent,
    StagierComponent,
    ProfileComponent,
    PicklisteComponent,
    DashbordChartComponent,
    SidenavigationComponent,
    AcceuilPageComponent,
    stageComponent,
    Propositionformation,
    PlanningComponent,
    DashbordFormationComponent,
    cabineComponent,
    typeformationComponent,
    actionreliseComponent,
    nbrhromponent,
    cabineComponent,
    CandidatComponent,
    propositionOffresComponent,
    offresEmploiComponent,
    RecruitmentComponent,
    txcomponent,
    vesiteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    NotificationModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgChartsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,   
    NgApexchartsModule, 
    NzSelectModule
  ],
  providers: [NotificationService , AuthenticationGuard ,AuthenticationService , UserService ,
     { provide :HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi :true }] ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}