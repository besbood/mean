import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgZorroAntdModule,
  ],
  exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgZorroAntdModule,
  ]
})
export class SharedModule { }
