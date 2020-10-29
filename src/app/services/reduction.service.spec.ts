import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ReductionService } from "./reduction.service";

describe("ReductionService", () => {
  let service: ReductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReductionService],
    });
    service = TestBed.inject(ReductionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
