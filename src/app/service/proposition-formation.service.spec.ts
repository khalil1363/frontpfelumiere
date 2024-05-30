import { TestBed } from '@angular/core/testing';

import { PropositionFormationService } from './proposition-formation.service';

describe('PropositionFormationService', () => {
  let service: PropositionFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropositionFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
