import { TestBed } from '@angular/core/testing';

import { NotifcationService } from './notifcation-service';

describe('NotifcationServiceService', () => {
  let service: NotifcationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifcationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
