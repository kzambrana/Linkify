import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '@ui/button/button.component';
import {InputComponent} from '@ui/input/input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@utils/navigation-routes.enum';

@Component({
  selector: 'lf-create-account-view',
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-account-view.component.html',
  styleUrl: './create-account-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateAccountViewComponent {
  public form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router) {
    this.form = this._fb.group({
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
      this._router.navigate([NavigationRoutes.CUSTOMIZE_LINKS]);
    }
  }

  public goToLoginView(): void {
    this._router.navigate([`${NavigationRoutes.AUTH}/${NavigationRoutes.LOGIN}`]);
  }
}
