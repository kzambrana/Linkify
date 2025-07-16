import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  public type = input<string>('');
  public placeholder = input<string>('');
  public iconPath = input<string>('');
  public errorMessage = input<string>('');
  public value = input<string>('');
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
