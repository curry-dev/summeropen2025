import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingluckyComponent } from './feelinglucky.component';

describe('FeelingluckyComponent', () => {
  let component: FeelingluckyComponent;
  let fixture: ComponentFixture<FeelingluckyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeelingluckyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeelingluckyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
