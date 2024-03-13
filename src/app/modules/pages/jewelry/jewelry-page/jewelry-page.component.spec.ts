import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelryPageComponent } from './jewelry-page.component';

describe('JewelryPageComponent', () => {
  let component: JewelryPageComponent;
  let fixture: ComponentFixture<JewelryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JewelryPageComponent]
    });
    fixture = TestBed.createComponent(JewelryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
