import { Employee } from "./Employee";

export interface Formation {
  idFormation: number;
  module: string;
  type: string;
  categorie: string;
  description: string;
  proposePar: string;
  posteProposerPar: string;
  cabinetproposer: string;
  departement: string;
  objectif: string;
  activite: string;
  formateurPropose:string;
  observation: string;
  budgetPrevisionnel: string;
  participants: Employee[];
}
