import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCategoryComponent } from './display-category.component';

describe('DisplayCategoryComponent', () => {
  let component: DisplayCategoryComponent;
  let fixture: ComponentFixture<DisplayCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
