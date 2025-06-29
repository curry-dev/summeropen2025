import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantripComponent } from './plantrip.component';

describe('PlantripComponent', () => {
  let component: PlantripComponent;
  let fixture: ComponentFixture<PlantripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
