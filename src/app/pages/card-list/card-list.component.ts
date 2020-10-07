import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Card, FilterOptions } from 'src/app/interfaces/card.interface';
import { PokemonTcgService } from 'src/app/services/pokemon-tcg.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: Card[];
  loading = true;
  filterOptions: FilterOptions = {
    name: '',
    types: [],
    weaknesses: [],
    resistances: [],
  };
  allTypes = ['Colorless', 'Darkness', 'Dragon', 'Fairy', 'Fighting', 'Fire', 'Grass', 'Lightning', 'Metal', 'Psychic', 'Water'];
  allWeaknesses = ['Fighting', 'Fire', 'Water', 'Grass', 'Psychic', 'Dragon', 'Dark', 'Fairy'];
  allResistances = this.allWeaknesses;

  constructor(private pokemonService: PokemonTcgService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterOptions = {
        name: params.name || '',
        weaknesses: params.weaknesses?.split(', ') || [],
        resistances: params.resistances?.split(', ') || [],
        types: params.types?.split(', ') || []
      };
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    this.pokemonService.getPokemonCards(this.filterOptions).subscribe(data => {
      const sortedData = data.cards.sort((a, b) => a.name.localeCompare(b.name));
      this.cards = sortedData;
      this.loading = false;
    });
  }

  removeSearchOption({ key, value }): void {
    const index = this.filterOptions[key].indexOf(value.trim());

    if (index >= 0) {
      this.filterOptions[key].splice(index, 1);
    }
    this.loadData();
  }

  addSearchOption({ key, value }): void {
    if (Array.isArray(this.filterOptions[key])) {
      const index = this.filterOptions[key].indexOf(value.trim());
      if (index === -1) {
        this.filterOptions[key].push(value.trim());
      }
    } else {
      this.filterOptions[key] = [value.trim()];
    }
    this.loadData();
  }
}
