import { Candidat } from './Candidat';
import { OffreEmploi } from './OffreEmploi';

export interface Recruitment {
  idRecrutement: number;
  departement: string;
  recruteur: string;
  nomCondidat: string;
  commentaire: string;
  dateDemandeRec: Date;
  emploiDemandeType: string;
  sourceType: string;
  selectionPhase: string;
  desisionType: string;
  vueGestionaire: string;
  vueDecideur: string;
  vueRh: string;
  candidat: Candidat[];
  offreEmploi: OffreEmploi[];
}
