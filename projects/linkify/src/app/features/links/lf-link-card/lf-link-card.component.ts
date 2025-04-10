import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';

@Component({
  selector: 'lf-link-card',
  imports: [
    LfInputComponent
  ],
  templateUrl: './lf-link-card.component.html',
  styleUrl: './lf-link-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfLinkCardComponent {

}
