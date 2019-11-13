import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageComponent } from './new-message.component';
import { HttpClientModule } from '@angular/common/http';

describe('NewMessageComponent', () => {
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ NewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
