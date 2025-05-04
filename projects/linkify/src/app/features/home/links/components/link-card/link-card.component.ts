import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {InputComponent} from '@ui/input/input.component';
import {DropdownComponent} from '@ui/drop-down/dropdown.component';
import {DropDownOption} from '@interfaces/drop-down-option.interface';
import {LinkCardInterface} from '@interfaces/link-card.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lf-link-card',
  imports: [
    InputComponent,
    DropdownComponent
  ],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCardComponent {
  public platformOptions = input<DropDownOption[]>([]);
  public cardNumber = input<number>(0);
  public dataLink = input<LinkCardInterface>({id: '', link: '', platform: ''});
  public deletedCardEmitter = output<string>();
  public updatedLinkEmitter = output<LinkCardInterface>();
  public linkControl!: FormControl<string>;

  constructor() {
    this._initializeLinkControl();
  }

  private _initializeLinkControl(): void {
    const initialLink = this.dataLink().link || '';

    this.linkControl = new FormControl(initialLink, {
      validators: [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/)
      ],
      nonNullable: true
    });

    this._listenToLinkService();
  }

  private _listenToLinkService(): void {
    this.linkControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        if (this.linkControl.valid && value) {
          const updated = {...this.dataLink(), link: value};
          this.updatedLinkEmitter.emit(updated);
        }
      });
  }

  public onPlatformSelect(option: DropDownOption): void {
    if (option.value === '') return;
    const updated = {...this.dataLink(), platform: option.value};
    this.updatedLinkEmitter.emit(updated);
  }

  public onLinkChange(value: string): void {
    this.linkControl.setValue(value);
    this.linkControl.markAsTouched();
  }

  public removeLinkCard(): void {
    this.deletedCardEmitter.emit(this.dataLink().id);
  }

  public get urlErrorMessage(): string {
    const control = this.linkControl;
    if (!control.touched || control.valid) return '';

    if (control.hasError('required')) return `Can't be empty`;
    if (control.hasError('pattern')) return `Please check the URL`;

    return '';
  }
  public getSelectedPlatformOption(): DropDownOption {
    const platform = this.dataLink().platform;
    const selectedOption = this.platformOptions().find(opt => opt.value === platform);
    return selectedOption ?? {
      label: '',
      value: '',
      iconPath: '',
      color: ''
    };
  }
}
