import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenClothingPageComponent } from './men-clothing-page.component';

describe('MenClothingPageComponent', () => {
  let component: MenClothingPageComponent;
  let fixture: ComponentFixture<MenClothingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenClothingPageComponent]
    });
    fixture = TestBed.createComponent(MenClothingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
