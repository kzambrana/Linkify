import {ChangeDetectionStrategy, Component, EventEmitter, input, output} from '@angular/core';

@Component({
    selector: 'lf-input',
    templateUrl: './lf-input.component.html',
    styleUrl: './lf-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfInputComponent {
    public type = input<string>('');
    public placeholder = input<string>('');
    public iconPath = input<string>('');
    public errorMessage = input<string>('');
    public inputValueChange = output<string>();

    public onInputChange(inputEvent: Event) {
        const value = (inputEvent.target as HTMLInputElement).value;
        const event = new CustomEvent('inputValueChange', { detail: value });
        dispatchEvent(event);
    }
}
