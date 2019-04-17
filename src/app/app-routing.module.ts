import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'index',  component: IndexComponent},
	{
		path: 'main',  component: MainComponent, children: [
		{ path: 'profile', component: ProfileComponent },
		{ path: '', component: ListComponent }
		]
	},
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: '**', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
