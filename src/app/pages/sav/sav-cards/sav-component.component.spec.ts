import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavComponentComponent } from './sav-component.component';

describe('SavComponentComponent', () => {
  let component: SavComponentComponent;
  let fixture: ComponentFixture<SavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
