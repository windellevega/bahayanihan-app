import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionLocationModalPage } from './transaction-location-modal.page';

describe('TransactionLocationModalPage', () => {
  let component: TransactionLocationModalPage;
  let fixture: ComponentFixture<TransactionLocationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionLocationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionLocationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
