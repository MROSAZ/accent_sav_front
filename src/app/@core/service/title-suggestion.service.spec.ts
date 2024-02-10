import { TestBed } from '@angular/core/testing';

import { TitleSuggestionService } from './title-suggestion.service';

describe('TitleSuggestionService', () => {
  let service: TitleSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
