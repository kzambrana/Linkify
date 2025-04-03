import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LfLoginViewComponent } from './lf-login-view/lf-login-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LfLoginViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
