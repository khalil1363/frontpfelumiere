import { Candidat } from "./Candidat";

export class OffreEmploi {
    idOffreEmploi: number;
    departement: string;
    jobTitre: string;
    coutEmbauche: number;
    duree: string;
    motifRecretement: string;
    dateLancement: Date;
    dateEmbauche: Date;
    recruteur: string;
    modeRecretement: string;
    statusOffre: string;
    candidatures: Candidat[];

  constructor() {
    this.idOffreEmploi = 0;
    this.departement = '';
    this.jobTitre = '';
    this.coutEmbauche = 0;
    this.duree = '';
    this.motifRecretement = '';
    this.dateLancement = null;
    this.dateEmbauche = null;
    this.recruteur = '';
    this.modeRecretement = '';
    this.statusOffre = '';
    this.candidatures = [];
  }
  }
  