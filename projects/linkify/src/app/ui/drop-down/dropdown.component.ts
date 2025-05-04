import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  input,
  OnInit,
  output,
  Renderer2,
  signal, ViewChild
} from '@angular/core';
import {DropDownOption} from '@interfaces/drop-down-option.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lf-drop-down',
  templateUrl: './dropdown.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLDivElement>;

  public options = input<DropDownOption[]>([]);
  public preSelectedOption = input<DropDownOption>({
    label: '',
    value: '',
    iconPath: '',
    color: ''
  });
  public placeholder = input<string>('');
  public selected = signal<DropDownOption>({
    label: '',
    value: '',
    iconPath: '',
    color: ''
  });
  public selectedOptionEmitter = output<DropDownOption>();
  public isOpen = false;

  constructor(private _render2: Renderer2,
              private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.selected.set(this.preSelectedOption());
  }

  ngAfterViewInit() {
    this._render2.listen('document', 'click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (this.isOpen && !this.dropdownContainer?.nativeElement.contains(target)) {
        this.toggleDropdown();
        this._cd.markForCheck()
      }
    });
  }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public selectOption(option: DropDownOption): void {
    this.selectedOptionEmitter.emit(option);
    this.selected.set(option);
    this.isOpen = false;
  }
}
