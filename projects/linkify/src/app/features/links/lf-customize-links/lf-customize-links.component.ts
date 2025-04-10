import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {LfLinkCardComponent} from '../lf-link-card/lf-link-card.component';

@Component({
  selector: 'lf-customize-links',
  templateUrl: './lf-customize-links.component.html',
  styleUrl: './lf-customize-links.component.scss',
  imports: [
    LfButtonComponent,
    LfLinkCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfCustomizeLinksComponent {

}
