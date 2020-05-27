import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdinaryComponent } from './ordinary/ordinary.component';
import { MembersComponent } from './members/members.component';
import { AdminsComponent } from './admins/admins.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: 'ordinary',
    component: OrdinaryComponent
  },
  {
    path: 'member',
    component: MembersComponent
  },
  {
    path: 'admin',
    component: AdminsComponent
  },
];

@NgModule({
  declarations: [
    OrdinaryComponent,
    MembersComponent,
    AdminsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule { }
