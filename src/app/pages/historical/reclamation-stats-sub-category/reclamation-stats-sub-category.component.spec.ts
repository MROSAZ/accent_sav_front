import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationStatsSubCategoryComponent } from './reclamation-stats-sub-category.component';

describe('ReclamationStatsSubCategoryComponent', () => {
  let component: ReclamationStatsSubCategoryComponent;
  let fixture: ComponentFixture<ReclamationStatsSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationStatsSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationStatsSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
