export interface PropositionOffre {
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
  }
  