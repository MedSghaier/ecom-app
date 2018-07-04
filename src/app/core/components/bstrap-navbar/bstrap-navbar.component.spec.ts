import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BstrapNavbarComponent } from './bstrap-navbar.component';

describe('BstrapNavbarComponent', () => {
  let component: BstrapNavbarComponent;
  let fixture: ComponentFixture<BstrapNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BstrapNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BstrapNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
