import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {LfDropdownComponent} from '../../../ui/lf-drop-down/lf-drop-down.component';
import {LfDropDownOption} from '../../../interfaces/lf-drop-down-option.interface';
import {LfPlatformsList} from '../../../utils/lf-platforms-list.constant';

@Component({
  selector: 'lf-link-card',
  imports: [
    LfInputComponent,
    LfDropdownComponent
  ],
  templateUrl: './lf-link-card.component.html',
  styleUrl: './lf-link-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfLinkCardComponent {
  platformOptions: LfDropDownOption[] = LfPlatformsList;

  public onPlatformSelect(option: LfDropDownOption): void {
  }
}
