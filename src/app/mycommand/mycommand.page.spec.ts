import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MycommandPage } from './mycommand.page';

describe('MycommandPage', () => {
  let component: MycommandPage;
  let fixture: ComponentFixture<MycommandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycommandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MycommandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
