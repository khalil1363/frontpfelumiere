// candidat.ts
import { OffreEmploi } from './OffreEmploi';

export interface Candidat {
  idCandidats: number;
  nomPrenom: string;
  cin: string;
  tel: string;
  adresse: string;
  niveau: string;
  diplome: string;
  famille: string;
  postPropose: string;
  contact: string;
  observation: string;
  date: Date;
  offresEmploi: number;
}
