import { TestBed } from '@angular/core/testing';

import { InstanceLogsService } from './instance-logs.service';

describe('InstanceLogsService', () => {
  let service: InstanceLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanceLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
