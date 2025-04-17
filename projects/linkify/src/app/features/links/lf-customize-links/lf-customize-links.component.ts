import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {LfLinkCardComponent} from '../lf-link-card/lf-link-card.component';
import {LfPlatformsList} from "../../../utils/lf-platforms-list.constant";
import {LfDropDownOption} from "../../../interfaces/lf-drop-down-option.interface";
import {LinkCardInterface} from "../../../interfaces/lf-link-card.interface";

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
    linksList: LinkCardInterface[] = [];
    emptyListEmitter = output<boolean>();

    readonly LF_PLATFORMS_LIST: LfDropDownOption[] = LfPlatformsList;

    public addLinkCard(): void {
        this.linksList.push({
            id: this._generateId(),
            platform: '',
            link: '',
        });
        this._emitIsEmptyList();
    }

    public deleteLinkCard(deletedCardId: string) {
        this.linksList = this.linksList.filter(link => link.id !== deletedCardId);
        this._emitIsEmptyList();
    }

    private _generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }

    private _emitIsEmptyList(): void {
        this.linksList.length === 0 ? this.emptyListEmitter.emit(true) : this.emptyListEmitter.emit(false);
    }
}
