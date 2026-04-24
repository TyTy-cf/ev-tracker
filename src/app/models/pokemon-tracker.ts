import { PowerItem } from './power-item';
import { PokemonEvs } from './pokemon-evs';

export interface PokemonTracker {
  id: string;
  isActive: boolean;
  name: string;
  nature: string;
  item: PowerItem | null;
  stats: PokemonEvs;
}
