import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTabPage } from './map-tab.page';

describe('MapTabPage', () => {
  let component: MapTabPage;
  let fixture: ComponentFixture<MapTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
