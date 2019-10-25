import { TestBed } from '@angular/core/testing';

import { UserCreditService } from './user-credit.service';

describe('UserCreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCreditService = TestBed.get(UserCreditService);
    expect(service).toBeTruthy();
  });
});
