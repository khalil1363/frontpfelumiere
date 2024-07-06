import { TestBed } from '@angular/core/testing';

import { OffreEmploiServiceService } from './offre-emploi-service.service';

describe('OffreEmploiServiceService', () => {
  let service: OffreEmploiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreEmploiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
