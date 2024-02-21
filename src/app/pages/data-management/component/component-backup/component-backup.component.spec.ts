import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBackupComponent } from './component-backup.component';

describe('ComponentBackupComponent', () => {
  let component: ComponentBackupComponent;
  let fixture: ComponentFixture<ComponentBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentBackupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
