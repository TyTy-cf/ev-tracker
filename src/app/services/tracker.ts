import { Injectable, signal, effect } from '@angular/core';
import { PokemonTracker } from '../models/pokemon-tracker';
import { StatType } from '../models/stat-type';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {

  team = signal<PokemonTracker[]>(this.loadFromLocalStorage());

  constructor() {
    effect(() => {
      localStorage.setItem('ev_team', JSON.stringify(this.team()));
    });
  }

  private loadFromLocalStorage(): PokemonTracker[] {
    const saved = localStorage.getItem('ev_team');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return this.getEmptyTeam();
      }
    }
    return this.getEmptyTeam();
  }

  private getEmptyTeam(): PokemonTracker[] {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i.toString(),
      isActive: true,
      name: '',
      nature: '',
      item: null,
      stats: {
        hp: { req: 0, done: 0 },
        atk: { req: 0, done: 0 },
        def: { req: 0, done: 0 },
        spa: { req: 0, done: 0 },
        spd: { req: 0, done: 0 },
        spe: { req: 0, done: 0 },
      },
    }));
  }

  addEv(baseStat: StatType, amount: number): void {
    this.team.update((currentTeam) => {
      return currentTeam.map((pokemon) => {
        if (!pokemon.isActive || pokemon.name.trim() === '') {
          return pokemon;
        }

        const updatedPokemon: PokemonTracker = structuredClone(pokemon);

        updatedPokemon.stats[baseStat].done += amount;

        if (updatedPokemon.item) {
          const itemStat: StatType = updatedPokemon.item.stat;
          updatedPokemon.stats[itemStat].done += updatedPokemon.item.bonus;
        }

        return updatedPokemon;
      });
    });
  }

  updatePokemon(updatedPokemon: PokemonTracker): void {
    this.team.update((currentTeam) => {
      const index = currentTeam.findIndex((p) => p.id === updatedPokemon.id);
      if (index !== -1) {
        const newTeam = [...currentTeam];
        newTeam[index] = updatedPokemon;
        return newTeam;
      }
      return currentTeam;
    });
  }
}
