import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './lf-button.component.html',
  styleUrl: './lf-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfButtonComponent {
  public buttonText = input<string>('');
  public disabled = input<boolean>(false);
  public primary = input<boolean>(false);

  public clickEmitter = output<void>();

  public onClick(): void {
    if (this.disabled()) return;
    const event = new CustomEvent('clickEmitter');
    dispatchEvent(event);
  }
}
