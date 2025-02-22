import { TestBed } from '@angular/core/testing';

import { BaseFireService } from './base-fire.service';

describe('BaseFireService', () => {
  let service: BaseFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
