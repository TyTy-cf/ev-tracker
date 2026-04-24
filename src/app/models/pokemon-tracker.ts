import { PowerItem } from './power-item';
import { PokemonEvs } from './pokemon-evs';
import { Nature } from './nature';

export interface PokemonTracker {
  id: string;
  isActive: boolean;
  name: string;
  nature: Nature | null;
  item: PowerItem | null;
  stats: PokemonEvs;
}
