import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
    selector: 'lf-input',
    templateUrl: './lf-input.component.html',
    styleUrl: './lf-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfInputComponent {
    type = input<string>('');
    placeholder = input<string>('');
    iconPath = input<string>('');
    errorMessage = input<string>('');
    inputValueChange = output<string>();
    isActive = false;

    public onFocus(): void {
        this.isActive = true;
    }

    public onBlur(): void {
        this.isActive = false;
    }

    public onInputChange(inputEvent: Event) {
        const value = (inputEvent.target as HTMLInputElement).value;
        this.inputValueChange.emit(value);
    }
}
