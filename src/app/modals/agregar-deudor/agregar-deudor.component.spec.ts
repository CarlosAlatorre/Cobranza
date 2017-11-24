import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDeudorComponent } from './agregar-deudor.component';

describe('AgregarDeudorComponent', () => {
  let component: AgregarDeudorComponent;
  let fixture: ComponentFixture<AgregarDeudorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDeudorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
