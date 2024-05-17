import { TestBed } from '@angular/core/testing';

import { StagierService } from './stagier.service';

describe('StagierService', () => {
  let service: StagierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StagierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
