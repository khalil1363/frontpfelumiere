
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
 
  constructor( ) {
    this.idStagier = 0;
    this.nomPrenom = "";
    this.institut = "";
    this.diplome = "";
    this.specialite = "";
    this.cin = "";
    this.tel = "";
    this.societe = "";
   
   
  }
 
}
