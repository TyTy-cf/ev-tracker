import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonRow } from './pokemon-row';

describe('PokemonRow', () => {
  let component: PokemonRow;
  let fixture: ComponentFixture<PokemonRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonRow],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
