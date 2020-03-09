import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkerTabsPage } from './worker-tabs.page';

describe('WorkerTabsPage', () => {
  let component: WorkerTabsPage;
  let fixture: ComponentFixture<WorkerTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
