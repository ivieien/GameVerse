import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLatestComponent } from './theLatest.component';

describe('TheLatestComponent', () => {
  let component: TheLatestComponent;
  let fixture: ComponentFixture<TheLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheLatestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
