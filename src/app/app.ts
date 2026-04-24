import { Component } from '@angular/core';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table';
import { TrackerService } from './services/tracker';

@Component({
  selector: 'app-root',
  imports: [PokemonTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  constructor(public trackerService: TrackerService) {
  }

}
