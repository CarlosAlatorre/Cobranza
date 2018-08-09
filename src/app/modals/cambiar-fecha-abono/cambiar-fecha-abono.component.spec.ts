import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarFechaAbonoComponent } from './cambiar-fecha-abono.component';

describe('CambiarFechaAbonoComponent', () => {
  let component: CambiarFechaAbonoComponent;
  let fixture: ComponentFixture<CambiarFechaAbonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarFechaAbonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarFechaAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
