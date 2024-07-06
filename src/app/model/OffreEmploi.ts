import { Candidat } from "./Candidat";

export interface OffreEmploi {
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
  }
  