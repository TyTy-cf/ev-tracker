import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerService } from '../../services/tracker';
import { PokemonTracker } from '../../models/pokemon-tracker';
import { StatType } from '../../models/stat-type';
import { PokemonRowComponent } from '../pokemon-row/pokemon-row';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule, PokemonRowComponent],
  templateUrl: './pokemon-table.html',
})
export class PokemonTableComponent {
  trackerService = inject(TrackerService);
  team = this.trackerService.team;

  statsList: { key: StatType; label: string }[] = [
    { key: 'hp', label: 'HP' },
    { key: 'atk', label: 'ATK' },
    { key: 'def', label: 'DEF' },
    { key: 'spa', label: 'SPA' },
    { key: 'spd', label: 'SPD' },
    { key: 'spe', label: 'SPE' },
  ];

  onPokemonUpdate(updatedPokemon: PokemonTracker) {
    this.trackerService.updatePokemon(updatedPokemon);
  }

  gainEv(stat: StatType, amount: number) {
    this.trackerService.addEv(stat, amount);
  }

  onResetPokemon(id: string): void {
    if (confirm('Réinitialiser ce Pokémon ?')) {
      this.trackerService.resetPokemon(id);
    }
  }

  onResetAll(): void {
    if (confirm("Réinitialiser toute l'équipe ? Cette action est irréversible !")) {
      this.trackerService.resetAll();
    }
  }
}
