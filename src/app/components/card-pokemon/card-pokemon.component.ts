import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {
  @Input() name: string;
  @Input() id: string;
  @Input() types: string[];
  @Input() srcImage: string;

  @Output() searchTypeEvent: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }

  searchType(type: string): void {
    this.searchTypeEvent.emit({ key: 'types', value: type});
  }

}
