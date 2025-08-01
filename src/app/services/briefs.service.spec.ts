import { TestBed } from '@angular/core/testing';

import { BriefsService } from './briefs.service';

describe('BriefsService', () => {
  let service: BriefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
