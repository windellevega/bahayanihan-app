import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTabPage } from './account-tab.page';

describe('Tab2Page', () => {
  let component: AccountTabPage;
  let fixture: ComponentFixture<AccountTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
