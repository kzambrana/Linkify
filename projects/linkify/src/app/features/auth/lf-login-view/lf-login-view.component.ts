import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {LfInputComponent} from '../../../ui/lf-input/lf-input.component';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'lf-login-view',
  templateUrl: './lf-login-view.component.html',
  styleUrls: ['./lf-login-view.component.scss'],
  imports: [LfInputComponent, LfButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfLoginViewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.form = this.fb.group({
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
      console.log('Valid form!');
    }
  }

  public goToCreateAccount(): void {
    this.router.navigate(['auth/create-account']);
  }
}
