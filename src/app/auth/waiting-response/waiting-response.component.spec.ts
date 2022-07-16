import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingResponseComponent } from './waiting-response.component';

describe('WaitingResponseComponent', () => {
  let component: WaitingResponseComponent;
  let fixture: ComponentFixture<WaitingResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
