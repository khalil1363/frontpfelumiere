import { TestBed } from '@angular/core/testing';

import { PropositionOffreServiceService } from './proposition-offre-service.service';

describe('PropositionOffreServiceService', () => {
  let service: PropositionOffreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropositionOffreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
