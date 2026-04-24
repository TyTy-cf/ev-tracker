import { Component, input, output, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonTracker } from '../../models/pokemon-tracker';
import { POWER_ITEMS } from '../../datas/power-items';
import { StatType } from '../../models/stat-type';
import { NATURES } from '../../datas/natures';

@Component({
  selector: '[app-pokemon-row]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-row.html',
})
export class PokemonRowComponent {
  pokemon = input.required<PokemonTracker>();
  pokemonChange = output<PokemonTracker>();
  powerItems = POWER_ITEMS;
  natures = NATURES;
  statsList: StatType[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
  pokemonSpriteUrl = signal<string | null>(null);

  itemSpriteUrl = computed(() => {
    const item = this.pokemon().item;
    if (!item) return null;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.spriteName}.png`;
  });

  totalReq = computed(() => {
    const stats = this.pokemon().stats;
    return (
      stats.hp.req + stats.atk.req + stats.def.req + stats.spa.req + stats.spd.req + stats.spe.req
    );
  });

  totalDone = computed(() => {
    const stats = this.pokemon().stats;
    return (
      stats.hp.done +
      stats.atk.done +
      stats.def.done +
      stats.spa.done +
      stats.spd.done +
      stats.spe.done
    );
  });

  private fetchTimeout: any;

  resetRequest = output<string>();

  constructor() {
    effect(
      () => {
        const nameOrId = this.pokemon().name.trim().toLowerCase();

        clearTimeout(this.fetchTimeout);

        if (nameOrId.length > 0) {
          this.fetchTimeout = setTimeout(() => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
              .then((res) => (res.ok ? res.json() : null))
              .then((data) => {
                if (data?.sprites?.other['official-artwork']?.front_default) {
                  this.pokemonSpriteUrl.set(data.sprites.other['official-artwork'].front_default);
                } else {
                  this.pokemonSpriteUrl.set(null);
                }
              })
              .catch(() => this.pokemonSpriteUrl.set(null));
          }, 400);
        } else {
          this.pokemonSpriteUrl.set(null);
        }
      },
      { allowSignalWrites: true },
    );
  }

  getTotalColor(): string {
    const req = this.totalReq();
    const done = this.totalDone();
    if (done === 0) return 'bg-white';
    if (done > 510 || done > req) return 'bg-red-200';
    if (req > 0 && done === req) return 'bg-green-200';
    return 'bg-yellow-100';
  }

  getCellColor(stat: StatType): string {
    const req = this.pokemon().stats[stat].req;
    const done = this.pokemon().stats[stat].done;

    if (done === 0) return 'bg-white';
    if (done > req) return 'bg-red-200';
    if (req > 0 && done === req) return 'bg-green-200';
    return 'bg-yellow-100';
  }

  updateField<K extends keyof PokemonTracker>(field: K, value: any): void {
    const updated = { ...this.pokemon(), [field]: value };
    this.pokemonChange.emit(updated);
  }

  updateStat(stat: StatType, type: 'req' | 'done', value: string): void {
    const numValue = parseInt(value, 10) || 0;
    const updated = structuredClone(this.pokemon());
    updated.stats[stat][type] = numValue;
    this.pokemonChange.emit(updated);
  }

  updateItemFromModel(selectedLabel: string | undefined): void {
    if (!selectedLabel) {
      this.updateField('item', null);
      return;
    }
    const item = this.powerItems.find((i) => i.label === selectedLabel) || null;
    this.updateField('item', item);
  }

  updateNatureFromModel(selectedLabel: string | undefined): void {
    if (!selectedLabel) {
      this.updateField('nature', null);
      return;
    }
    const nature = this.natures.find((i) => i.label === selectedLabel) || null;
    this.updateField('nature', nature);
  }

  onReset(): void {
    this.resetRequest.emit(this.pokemon().id);
  }

}
