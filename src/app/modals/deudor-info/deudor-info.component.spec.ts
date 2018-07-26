import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudorInfoComponent } from './deudor-info.component';

describe('DeudorInfoComponent', () => {
  let component: DeudorInfoComponent;
  let fixture: ComponentFixture<DeudorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeudorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
