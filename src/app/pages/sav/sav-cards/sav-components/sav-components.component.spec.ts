import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavComponentsComponent } from './sav-components.component';

describe('SavComponentsComponent', () => {
  let component: SavComponentsComponent;
  let fixture: ComponentFixture<SavComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
