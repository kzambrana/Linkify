import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {LfDropdownComponent} from '../../../ui/lf-drop-down/lf-drop-down.component';
import {LfDropDownOption} from '../../../interfaces/lf-drop-down-option.interface';
import {LinkCardInterface} from "../../../interfaces/lf-link-card.interface";
import {FormControl, Validators} from "@angular/forms";

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
    platformOptions = input<LfDropDownOption[]>([]);
    cardNumber = input<number>(0);
    dataLink = input<LinkCardInterface>({id: '', link: '', platform: ''});
    deletedCardEmitter = output<string>();

    linkControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/)
    ]);

    public onPlatformSelect(option: LfDropDownOption): void {
    }

    public onLinkChange(value: string): void {
        this.linkControl.setValue(value);
        this.linkControl.markAsTouched();
    }

    public removeLinkCard(): void {
        this.deletedCardEmitter.emit(this.dataLink().id);
    }

    get urlErrorMessage(): string {
        const control = this.linkControl;
        if (!control.touched || control.valid) return '';

        if (control.hasError('required')) {
            return `Can't be empty`;
        }

        if (control.hasError('pattern')) {
            return `Please check the URL`;
        }

        return '';
    }
}
