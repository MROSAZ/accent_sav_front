import { TestBed } from '@angular/core/testing';

import { ModelComponentService } from './model-component.service';

describe('ModelComponentService', () => {
  let service: ModelComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
