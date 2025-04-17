import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfHeaderComponent} from '../../../layout/lf-header/lf-header.component';
import LfCustomizeLinksComponent from '../../links/lf-customize-links/lf-customize-links.component';
import {LfMobilePreviewComponent} from '../../preview/lf-mobile-preview/lf-mobile-preview.component';

@Component({
    selector: 'lf-main-links-customize',
    imports: [
        LfHeaderComponent,
        LfCustomizeLinksComponent,
        LfMobilePreviewComponent,
        LfCustomizeLinksComponent
    ],
    templateUrl: './lf-main-links-customize.component.html',
    styleUrl: './lf-main-links-customize.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfMainLinksCustomizeComponent {
}
