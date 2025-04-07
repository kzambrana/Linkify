import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';

@Component({
  selector: 'lf-login-view',
  templateUrl: './lf-login-view.component.html',
  styleUrl: './lf-login-view.component.scss',
  imports: [LfInputComponent, LfButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfLoginViewComponent {
}
