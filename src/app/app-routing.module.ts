import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistComponent } from './pages/regist/regist.component';
import { HomeComponent } from './pages/home/home.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiderComponent } from './component/sider/sider.component';
import { HeaderComponent } from './component/header/header.component';

import { SharedModule } from './shared/shared.module';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'regist',
        component: RegistComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegistComponent,
    HomeComponent,
    SiderComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
