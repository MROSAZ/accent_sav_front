import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationStatsUserComponent } from './reclamation-stats-user.component';

describe('ReclamationStatsUserComponent', () => {
  let component: ReclamationStatsUserComponent;
  let fixture: ComponentFixture<ReclamationStatsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationStatsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationStatsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
