import { TestBed, inject } from '@angular/core/testing';

import { DeudoresService } from './deudores.service';

describe('DeudoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeudoresService]
    });
  });

  it('should be created', inject([DeudoresService], (service: DeudoresService) => {
    expect(service).toBeTruthy();
  }));
});
