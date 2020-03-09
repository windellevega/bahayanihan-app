import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTabPage } from './categories-tab.page';

describe('Tab1Page', () => {
  let component: CategoriesTabPage;
  let fixture: ComponentFixture<CategoriesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
