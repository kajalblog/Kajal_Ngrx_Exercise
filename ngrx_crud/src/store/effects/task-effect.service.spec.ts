import { TestBed } from '@angular/core/testing';

import { TaskEffect } from './task-effect.effect';

describe('TaskEffectService', () => {
  let service: TaskEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
