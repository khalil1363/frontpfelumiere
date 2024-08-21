
import { Employee } from './Employee';
import { Stage } from './Stage';


export class Stagier {
  idStagier: number;
  nomPrenom: string;
  institut: string;
  diplome: string;
  specialite: string;
  cin: string;
  tel: string;
   societe: string;
  superviseur: Employee;
  stage: Stage;
 
  constructor(
    idStagier: number = 0,
    nomPrenom: string = '',
    institut: string = '',
    diplome: string = '',
    specialite: string = '',
    cin: string = '',
    tel: string = '',
    societe: string = '',
    superviseur: Employee = null,
    stage: Stage = null
  ) {
    this.idStagier = idStagier;
    this.nomPrenom = nomPrenom;
    this.institut = institut;
    this.diplome = diplome;
    this.specialite = specialite;
    this.cin = cin;
    this.tel = tel;
    this.societe = societe;
    this.superviseur = superviseur;
    this.stage = stage;
  }
 
}
