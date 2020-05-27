import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  imports: [
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
