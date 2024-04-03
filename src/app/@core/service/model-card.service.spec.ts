import { TestBed } from '@angular/core/testing';

import { ModelCardService } from './model-card.service';

describe('ModelCardService', () => {
  let service: ModelCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
