import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'lf-create-account-view',
  imports: [
    LfButtonComponent,
    LfInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './lf-create-account-view.component.html',
  styleUrl: './lf-create-account-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfCreateAccountViewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  public getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Cant be empty';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (controlName === 'password' && control.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    if (controlName === 'confirmPassword' && this.form.get('confirmPassword')?.value !== this.form.get('password')?.value) {
      return 'Passwords do not match';
    }

    return '';
  }


  public onInputValueChange(controlName: string, value: string): void {
    this.form.get(controlName)?.setValue(value);
    this.form.get(controlName)?.markAsTouched();
    this.form.updateValueAndValidity();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      console.log('Valid form!');
    }
  }

  public goToLoginView(): void {
    this.router.navigate(['/auth/login']);
  }
}
