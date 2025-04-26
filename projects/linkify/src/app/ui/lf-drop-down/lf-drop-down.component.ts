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
export class LfDropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLDivElement>;

  public options = input<LfDropDownOption[]>([]);
  public preSelectedOption = input<LfDropDownOption>({
    label: '',
    value: '',
    iconPath: '',
    color: ''
  });
  public placeholder = input<string>('');
  public selected = signal<LfDropDownOption>({
    label: '',
    value: '',
    iconPath: '',
    color: ''
  });
  public selectedOptionEmitter = output<LfDropDownOption>();
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

  public selectOption(option: LfDropDownOption): void {
    this.selectedOptionEmitter.emit(option);
    this.selected.set(option);
    this.isOpen = false;
  }
}
