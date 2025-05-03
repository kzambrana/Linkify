import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfProfilePreviewComponent} from '../lf-profile-preview/lf-profile-preview.component';

@Component({
  selector: 'lf-mobile-preview',
  imports: [
    LfProfilePreviewComponent
  ],
  templateUrl: './lf-mobile-preview.component.html',
  styleUrl: './lf-mobile-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfMobilePreviewComponent {

}
