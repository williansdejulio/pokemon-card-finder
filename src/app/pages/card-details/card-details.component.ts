import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, FilterOptions } from 'src/app/interfaces/card.interface';
import { PokemonTcgService } from 'src/app/services/pokemon-tcg.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  card: Card;
  loading = true;

  constructor(private router: Router, private route: ActivatedRoute, private pokemonService: PokemonTcgService) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        if (params.id) {
          this.pokemonService.getCardById(params.id).subscribe(data => {
            this.card = data.card;
            this.loading = false;
          });
        }
      });
  }

  searchBy(filterOptions: FilterOptions): void {
    this.router.navigate(['card-list'], { queryParams: filterOptions });
  }
}
