export class Planning {
    idPlanning: number;
    module: string;
    departement: string;
    type: string;
    categorie : string;
    demandeur: string;
    posteProposerPar: string;
    cabinetproposer: string;
    objectif: string;
    activite: string;
    formateur: string;
    observation: string;
    budgetPrevisionnel: string;
    budgetEstimatif: string;
    statusPlannig: string;
    coutreel: string;
    evaluationChaud: string;
    evaluationFroid: string;
    dateRealisation: Date;
    dateend:Date;
    nbj:string;

    constructor() {
      this.idPlanning = 0;
      this.module = "";
      this.departement = '';
      this.type = '';
      this.categorie = '';
      this.demandeur = '';
      this.posteProposerPar = '';
      this.cabinetproposer = '';
      this.objectif = '';
      this.activite = '';
      this.formateur = '';
      this.observation = '';
      this.budgetPrevisionnel = '';
      this.budgetEstimatif = '';
      this.statusPlannig = '';
      this.coutreel = '';
      this.evaluationChaud = '';
      this.evaluationFroid = '';
      this.dateRealisation = null;
      this.dateend = null;
      this.nbj = '';
  }
  
  }
  