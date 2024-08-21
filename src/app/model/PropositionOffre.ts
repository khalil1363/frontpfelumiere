export class PropositionOffre {
  idOffreProp: number;
    departement: string;
    jobTitle: string;
    coutEmbauche: number;
    duree: string;
    motifRecretement: string;
    dateLancement: Date;
    dateEmbauche: Date;
    recruteur: string;
    modeRecretement : string;
    statusPropo: string; // Assuming there's a status field in your entity
    constructor() {
      this.idOffreProp = 0;
      this.departement = '';
      this.jobTitle = '';
      this.coutEmbauche = 0;
      this.duree = '';
      this.motifRecretement = '';
      this.dateLancement = null;
      this.dateEmbauche = null;
      this.recruteur = '';
      this.modeRecretement = '';
      this.statusPropo = '';
    }
  }
  