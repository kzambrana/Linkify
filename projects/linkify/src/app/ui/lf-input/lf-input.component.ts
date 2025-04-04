import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'lf-input',
  templateUrl: './lf-input.component.html',
  styleUrl: './lf-input.component.scss',
  imports: [
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfInputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() iconPath: string = '';
  @Input() errorMessage: string = '';
  @Output() inputValueChange = new EventEmitter<string>();

  public onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValueChange.emit(value);
  }
}
