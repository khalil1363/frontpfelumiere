import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guard/authentication.guard';

import { LoginComponent } from './login/login.component';

import { stageComponent } from './stage/stage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { UniteFabricationComponent } from './unite-fabrication/unite-fabrication.component';
import { UserComponent } from './user/user.component';
import { PicklisteComponent } from './pickliste/pickliste.component';
import { DashbordChartComponent } from './dashbord-chart/dashbord-chart.component';
import { SidenavigationComponent } from './sidenavigation/sidenavigation.component';
import { AcceuilPageComponent } from './acceuil-page/acceuil-page.component';

import { FormationComponent } from './formation/formation.component';
import { StagierComponent } from './stagiaire/stagiaire.component';
import { Propositionformation } from './propositionformation/propositionformation.component';
import { PlanningComponent } from './planning/planning.component';




const routes: Routes = [
  {path : 'register' , component : RegisterComponent} ,
  {path : 'user/management' , component : UserComponent , canActivate : [AuthenticationGuard]} ,
  {path : 'setting' , component : SettingComponent} ,
  {path : 'unite-fabrication' , component : UniteFabricationComponent }  ,
  {path : 'stagier' , component : StagierComponent } ,
  {path : 'stage' , component : stageComponent } ,
  {path : 'profile' , component : ProfileComponent } ,
  {path : 'pickliste' , component : PicklisteComponent } ,
  {path : 'dashbord-chart' , component : DashbordChartComponent } ,
  {path : '' , redirectTo : '/acceuil' , pathMatch : 'full'},
  {path : 'side-nav' , component : SidenavigationComponent },
  {path : 'acceuil' , component : AcceuilPageComponent },
  {path : 'formation' , component : FormationComponent },
  {path : 'propositionformation' , component : Propositionformation },
  {path : 'planning' , component : PlanningComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
