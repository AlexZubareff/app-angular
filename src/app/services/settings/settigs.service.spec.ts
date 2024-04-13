import { TestBed } from '@angular/core/testing';

import { SettigsService } from './settigs.service';

describe('SettigsService', () => {
  let service: SettigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
