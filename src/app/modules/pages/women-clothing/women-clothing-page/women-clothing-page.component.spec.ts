import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenClothingPageComponent } from './women-clothing-page.component';

describe('WomenClothingPageComponent', () => {
  let component: WomenClothingPageComponent;
  let fixture: ComponentFixture<WomenClothingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomenClothingPageComponent]
    });
    fixture = TestBed.createComponent(WomenClothingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
