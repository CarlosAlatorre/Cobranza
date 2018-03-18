import { TestBed, inject } from '@angular/core/testing';

import { DateDiff } from './date-diff.service';

describe('DateDiff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateDiff]
    });
  });

  it('should be created', inject([DateDiff], (service: DateDiff) => {
    expect(service).toBeTruthy();
  }));
});
