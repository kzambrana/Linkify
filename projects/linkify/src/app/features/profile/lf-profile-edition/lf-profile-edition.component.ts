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

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  imagePreview: string | null = null;

  private readonly maxFileSize = 1024 * 1024;
  private readonly maxWidth = 1024;
  private readonly maxHeight = 1024;
  private readonly allowedTypes = ['image/png', 'image/jpeg'];

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private profileUpdateService: ProfileUpdateService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  public onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!this.allowedTypes.includes(file.type)) {
      alert('Only PNG or JPG images are allowed.');
      return;
    }

    if (file.size > this.maxFileSize) {
      alert('Image size must be below 1MB.');
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      img.onload = () => {
        if (img.width > this.maxWidth || img.height > this.maxHeight) {
          alert('Image dimensions must be below 1024x1024px.');
          return;
        }
        this.imagePreview = result;
        this.profileUpdateService.updateProfile({ image: this.imagePreview });
        this._cdr.detectChanges();
      };
      img.src = result;
    };

    reader.readAsDataURL(file);
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

    this.profileUpdateService.updateProfile({ [field]: value });
  }
}
