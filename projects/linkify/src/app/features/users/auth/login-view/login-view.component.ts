import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {InputComponent} from '@ui/input/input.component';
import {ButtonComponent} from '@ui/button/button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@utils/navigation-routes.enum';

@Component({
  selector: 'lf-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginViewComponent {
  public form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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


  public onInputValueChange(controlName: string, value: string): void {
    this.form.get(controlName)?.setValue(value);
    this.form.get(controlName)?.markAsTouched();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this._router.navigate([NavigationRoutes.CUSTOMIZE_LINKS]);
    }
  }

  public goToCreateAccount(): void {
    this._router.navigate([`${NavigationRoutes.AUTH}/${NavigationRoutes.CREATE_ACCOUNT}`]);
  }
}
