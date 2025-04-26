import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileUpdateService} from '../../../services/profile-update.service';

@Component({
  selector: 'lf-profile-edition',
  standalone: true,
  imports: [CommonModule, LfButtonComponent, LfInputComponent, ReactiveFormsModule],
  templateUrl: './lf-profile-edition.component.html',
  styleUrls: ['./lf-profile-edition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfProfileEditionComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public imagePreview: string | null = null;
  public form: FormGroup;

  private readonly _maxFileSize = 1024 * 1024;
  private readonly _maxWidth = 1024;
  private readonly _maxHeight = 1024;
  private readonly _allowedTypes = ['image/png', 'image/jpeg'];

  constructor(private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _profileUpdateService: ProfileUpdateService) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  public onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!this.isFileTypeAllowed(file.type)) {
      this.showAlert('Only PNG or JPG images are allowed.');
      return;
    }

    if (this.isFileSizeExceeded(file.size)) {
      this.showAlert('Image size must be below 1MB.');
      return;
    }

    this.readAndValidateImage(file);
  }

  private isFileTypeAllowed(fileType: string): boolean {
    return this._allowedTypes.includes(fileType);
  }

  private isFileSizeExceeded(fileSize: number): boolean {
    return fileSize > this._maxFileSize;
  }

  private readAndValidateImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.validateImageDimensions(result);
    };
    reader.readAsDataURL(file);
  }

  private validateImageDimensions(imageSrc: string): void {
    const img = new Image();
    img.onload = () => {
      if (img.width > this._maxWidth || img.height > this._maxHeight) {
        this.showAlert('Image dimensions must be below 1024x1024px.');
        return;
      }
      this.setImagePreview(imageSrc);
    };
    img.src = imageSrc;
  }

  private setImagePreview(imageSrc: string): void {
    this.imagePreview = imageSrc;
    this._profileUpdateService.updateProfile({ image: this.imagePreview });
    this._cdr.detectChanges();
  }

  private showAlert(message: string): void {
    alert(message);
  }

  public saveProfile(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  public triggerFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }

  public getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control || !control.touched || control.valid) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Cant be empty';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }

  public onInputValueChange(field: string, value: string): void {
    this.form.get(field)?.setValue(value);
    this.form.get(field)?.markAsTouched();

    this._profileUpdateService.updateProfile({ [field]: value });
  }
}
