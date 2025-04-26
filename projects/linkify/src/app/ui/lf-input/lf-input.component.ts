import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-input',
  templateUrl: './lf-input.component.html',
  styleUrl: './lf-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfInputComponent {
  public type = input<string>('');
  public placeholder = input<string>('');
  public iconPath = input<string>('');
  public errorMessage = input<string>('');
  public inputValueChange = output<string>();
  public isActive = false;

  public onFocus(): void {
    this.isActive = true;
  }

  public onBlur(): void {
    this.isActive = false;
  }

  public onInputChange(inputEvent: Event) {
    const value = (inputEvent.target as HTMLInputElement).value;
    this.inputValueChange.emit(value);
  }
}
