import { Employee } from "./Employee";

export interface PropositionFormation {
  idProposition: number;
  module: string;
  typePropo: string;
  categorie: string;
  description: string;
  proposePar: string;
  posteProposerPar: string;
  cabinetproposer?: string;
  departement: string;
  isAccepted: boolean;
  status: string;
  objectif: string;
  activite: string;
  formateurPropose?: string;
  observation   ?: string;
  periodeSouhaite: Date;
  dateCreation: Date;
  participants: Employee[];

  //employeeNames:string[];
  
}