import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './lf-button.component.html',
  styleUrl: './lf-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfButtonComponent {
  buttonText = input<string>('');
  disabled = input<boolean>(false);
  primary = input<boolean>(false);

  clickEmitter = output<void>();

  public onClick(): void {
    if (this.disabled()) return;
    this.clickEmitter.emit();
  }
}
