import { TestBed } from '@angular/core/testing';

import { ConfigADALService } from './config-adal.service';

describe('ConfigADALService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigADALService = TestBed.get(ConfigADALService);
    expect(service).toBeTruthy();
  });
});
