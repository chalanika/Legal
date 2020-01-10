import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesLawyerComponent } from './cases-lawyer.component';

describe('CasesLawyerComponent', () => {
  let component: CasesLawyerComponent;
  let fixture: ComponentFixture<CasesLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
