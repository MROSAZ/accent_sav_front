import { TestBed } from '@angular/core/testing';

import { MyTranslationService } from './my-translation.service';

describe('MyTranslationServiceService', () => {
  let service: MyTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
