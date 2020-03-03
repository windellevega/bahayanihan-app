import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionFormPage } from './transaction-form.page';

describe('TransactionFormPage', () => {
  let component: TransactionFormPage;
  let fixture: ComponentFixture<TransactionFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
