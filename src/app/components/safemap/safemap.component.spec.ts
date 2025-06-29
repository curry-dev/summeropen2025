import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafemapComponent } from './safemap.component';

describe('SafemapComponent', () => {
  let component: SafemapComponent;
  let fixture: ComponentFixture<SafemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafemapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
