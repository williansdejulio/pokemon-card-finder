import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: 'chips-autocomplete.component.html',
  styleUrls: ['chips-autocomplete.component.scss'],
})
export class ChipsAutocompleteComponent {
  @Input() itemName: string;
  @Input() itemsSelected: string[];
  @Input() allItems: string[];
  @Input() placeholder: string;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl();
  filteredItems: Observable<string[]>;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() addItem: EventEmitter<object> = new EventEmitter<object>();
  @Output() removeItem: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
    this.filteredItems = this.formCtrl.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addItem.emit({key: this.itemName, value});
    }
    if (input) {
      input.value = '';
    }
    this.formCtrl.setValue(null);
  }

  remove(value: string): void {
    this.removeItem.emit({key: this.itemName, value});
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addItem.emit({ key: this.itemName, value: event.option.viewValue});
    this.itemInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }
}
