
import { Employee } from './Employee';
import { Stage } from './Stage';


export interface Stagier {
  idStagier: number;
  nomPrenom: string;
  institut: string;
  diplome: string;
  specialite: string;
  cin: string;
  tel: string;
  superviseur: Employee;
  stage: Stage;
}
