import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from '@ui/button/button.component';
import {InputComponent} from '@ui/input/input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileUpdateService} from '@services/profile-update.service';
import {ProfileDataInterface} from '@interfaces/profile-data.interface';
import {ProfileHttpService} from 'src/app/core/services/profile-http.service';

@Component({
  selector: 'lf-profile-edition',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './profile-edition.component.html',
  styleUrls: ['./profile-edition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditionComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public imagePreview: string | null = null;
  public form: FormGroup;
  public profileData: WritableSignal<ProfileDataInterface>;

  private readonly _maxFileSize = 1024 * 1024;
  private readonly _maxWidth = 1024;
  private readonly _maxHeight = 1024;
  private readonly _allowedTypes = ['image/png', 'image/jpeg'];

  constructor(private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _profileHttpService: ProfileHttpService,
              private _profileUpdateService: ProfileUpdateService) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.profileData = this._profileUpdateService.profile;
     effect(() => this.profileData());     
  }

  ngOnInit(): void {
    this._profileHttpService.getProfile(2).subscribe((profile) => this._profileUpdateService.updateProfile(profile));
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
      this._profileUpdateService.updateProfile({image: imageSrc});
    };
    img.src = imageSrc;
  }

  private setImagePreview(imageSrc: string): void {
    this.imagePreview = imageSrc;
    this._cdr.detectChanges();
  }

  private showAlert(message: string): void {
    alert(message);
  }

  public saveProfile(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const newProfile = {
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        email: this.form.get('email')?.value,
        image: this.imagePreview ? this.imagePreview : '',
      };
      this._profileUpdateService.updateProfile(newProfile);
      this._profileHttpService.updateProfile(2, newProfile).subscribe();
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

    this._profileUpdateService.updateProfile({[field]: value});
  }
}
