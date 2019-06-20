import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTabPage } from './transactions-tab.page';

describe('TransactionsTabPage', () => {
  let component: TransactionsTabPage;
  let fixture: ComponentFixture<TransactionsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
