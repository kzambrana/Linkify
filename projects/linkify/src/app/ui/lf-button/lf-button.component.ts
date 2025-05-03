import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './lf-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfButtonComponent {
  public buttonText = input<string>('');
  public disabled = input<boolean>(false);
  public primary = input<boolean>(false);

  public clickEmitter = output<void>();

  public onClick(): void {
    if (this.disabled()) return;
    this.clickEmitter.emit();
  }
}
