import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    title: 'User List',
    component: UserListComponent,
  },
  {
    path: 'add',
    title: 'Add new user',
    component: UserAddComponent,
  },
  {
    path: 'edit',
    title: 'Edit user',
    component: UserEditComponent,
  },
];
