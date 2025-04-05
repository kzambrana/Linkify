import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'lf-button',
  templateUrl: './lf-button.component.html',
  styleUrl: './lf-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfButtonComponent {
  public buttonText = input<string>('');
}
