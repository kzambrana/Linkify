import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {LfDropDownOption} from '../../interfaces/lf-drop-down-option.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lf-drop-down',
  templateUrl: './lf-drop-down.component.html',
  styleUrl: './lf-drop-down.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LfDropdownComponent {
  options = input<LfDropDownOption[]>([]);
  selected = signal<LfDropDownOption | null>(null);
  optionSelected = output<LfDropDownOption>();
  isOpen = false;

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public selectOption(option: LfDropDownOption): void {
    this.optionSelected.emit(option);
    this.isOpen = false;
    console.log(this.isOpen)
    this.selected.set(option);
  }
}
