import { TestBed } from '@angular/core/testing';

import { VisiteMedicaleService } from './visite-medicale.service';

describe('VisiteMedicaleService', () => {
  let service: VisiteMedicaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisiteMedicaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
