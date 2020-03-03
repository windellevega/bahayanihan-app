import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerinfoModalPage } from './workerinfo-modal.page';

describe('WorkerinfoModalPage', () => {
  let component: WorkerinfoModalPage;
  let fixture: ComponentFixture<WorkerinfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerinfoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerinfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
