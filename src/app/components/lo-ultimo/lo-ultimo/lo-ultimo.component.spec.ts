import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoUltimoComponent } from './lo-ultimo.component';

describe('LoUltimoComponent', () => {
  let component: LoUltimoComponent;
  let fixture: ComponentFixture<LoUltimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoUltimoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoUltimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
