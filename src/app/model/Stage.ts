export class Stage {
  idStage?: number; 
    theme: string;
    departement: string;
    site: string;
    dateDebut: Date;
    dateFin: Date;
    bilan: string;
    reference: string;
    
    constructor() {
      this.idStage = 0;
      this.theme = "";
      this.departement = "";
      this.site = "";
      this.dateDebut = null;
      this.dateFin = null;
      this.bilan = "";
      this.reference = "";
  }
  }
  