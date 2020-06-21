import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFinishComponent } from './job-finish.component';

describe('JobFinishComponent', () => {
  let component: JobFinishComponent;
  let fixture: ComponentFixture<JobFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
