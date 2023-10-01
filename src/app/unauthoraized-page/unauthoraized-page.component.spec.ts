import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthoraizedPageComponent } from './unauthoraized-page.component';

describe('UnauthoraizedPageComponent', () => {
  let component: UnauthoraizedPageComponent;
  let fixture: ComponentFixture<UnauthoraizedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthoraizedPageComponent]
    });
    fixture = TestBed.createComponent(UnauthoraizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
