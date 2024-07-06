import { Employee } from "./Employee";

export class PropositionFormation implements PropositionFormation {
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
  constructor() {
    this.idProposition = 0;
    this.module = '';
    this.typePropo = '';
    this.categorie = '';
    this.description = '';
    this.proposePar = '';
    this.posteProposerPar = '';
    this.cabinetproposer = '';
    this.departement = '';
    this.isAccepted = false;
    this.status = '';
    this.objectif = '';
    this.activite = '';
    this.formateurPropose = '';
    this.observation = '';
    this.periodeSouhaite = new Date();
    this.dateCreation = new Date();
    this.participants = [];
  }
}
