import { TestBed } from '@angular/core/testing';

import { HistoriqueMaintenanceService } from './historique-maintenance.service';

describe('HistoriqueMaintenanceService', () => {
  let service: HistoriqueMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
