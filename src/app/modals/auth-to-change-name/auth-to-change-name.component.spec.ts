import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthToChangeNameComponent } from './auth-to-change-name.component';

describe('AuthToChangeNameComponent', () => {
  let component: AuthToChangeNameComponent;
  let fixture: ComponentFixture<AuthToChangeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthToChangeNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthToChangeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
