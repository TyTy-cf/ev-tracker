import { Nature } from '../models/nature';

export const NATURES: Nature[] = [
  { label: 'Adamant', positiveEffect: '+atk', negativeEffect: '-spa' },
  { label: 'Impish', positiveEffect: '+def', negativeEffect: '-spa' },
  { label: 'Careful', positiveEffect: '+spd', negativeEffect: '-spa' },
  { label: 'Jolly', positiveEffect: '+spe', negativeEffect: '-spa' },

  { label: 'Brave', positiveEffect: '+atk', negativeEffect: '-spe' },
  { label: 'Quiet', positiveEffect: '+spa', negativeEffect: '-spe' },
  { label: 'Sassy', positiveEffect: '+spd', negativeEffect: '-spe' },
  { label: 'Relaxed', positiveEffect: '+def', negativeEffect: '-spe' },

  { label: 'Bold', positiveEffect: '+def', negativeEffect: '-atk' },
  { label: 'Calm', positiveEffect: '+spd', negativeEffect: '-atk' },
  { label: 'Modest', positiveEffect: '+spa', negativeEffect: '-atk' },
  { label: 'Timid', positiveEffect: '+spe', negativeEffect: '-atk' },
];
