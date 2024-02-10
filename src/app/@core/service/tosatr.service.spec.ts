import { TestBed } from '@angular/core/testing';

import { TosatrService } from './tosatr.service';

describe('TosatrService', () => {
  let service: TosatrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosatrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
