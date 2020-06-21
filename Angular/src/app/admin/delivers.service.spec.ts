import { TestBed } from '@angular/core/testing';

import { DeliversService } from './delivers.service';

describe('DeliversService', () => {
  let service: DeliversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
