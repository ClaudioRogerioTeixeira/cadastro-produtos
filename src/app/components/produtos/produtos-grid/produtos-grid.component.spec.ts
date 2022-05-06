import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosGridComponent } from './produtos-grid.component';

describe('ProdutosGridComponent', () => {
  let component: ProdutosGridComponent;
  let fixture: ComponentFixture<ProdutosGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
