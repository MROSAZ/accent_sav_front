import { TestBed } from '@angular/core/testing';

import { ComponentBuckupService } from './component-buckup.service';

describe('ComponentBuckupService', () => {
  let service: ComponentBuckupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentBuckupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
