import { Employee } from "./Employee";

export class Formation {
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

  constructor() {
    this.idFormation = 0;
    this.module = '';
    this.type = '';
    this.categorie = '';
    this.description = '';
    this.proposePar = '';
    this.posteProposerPar = '';
    this.cabinetproposer = '';
    this.departement = '';
    this.objectif = '';
    this.activite = '';
    this.formateurPropose = '';
    this.observation = '';
    this.budgetPrevisionnel = '';

  }
}
