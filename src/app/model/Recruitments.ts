export class Recruitment {
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
    candidat: any; // Adjust the type as per your actual Candidat model
    offreEmploi: any; // Adjust the type as per your actual OffreEmploi model
    constructor() {
      this.idRecrutement = 0;
      this.departement = '';
      this.recruteur = '';
      this.nomCondidat = '';
      this.commentaire = '';
      this.dateDemandeRec = null;
      this.emploiDemandeType = '';
      this.sourceType = '';
      this.selectionPhase = '';
      this.desisionType = '';
      this.vueGestionaire = '';
      this.vueDecideur = '';
      this.vueRh = '';
      this.candidat = null;
      this.offreEmploi = null;
    }
  }
  