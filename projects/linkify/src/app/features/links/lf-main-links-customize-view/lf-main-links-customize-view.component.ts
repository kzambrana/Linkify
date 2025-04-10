import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LfHeaderComponent} from '../../../layout/lf-header/lf-header.component';
import LfCustomizeLinksComponent from '../lf-customize-links/lf-customize-links.component';

@Component({
  selector: 'lf-main-links-customize-view',
  imports: [
    LfHeaderComponent,
    LfCustomizeLinksComponent
  ],
  templateUrl: './lf-main-links-customize-view.component.html',
  styleUrl: './lf-main-links-customize-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfMainLinksCustomizeViewComponent {

}
