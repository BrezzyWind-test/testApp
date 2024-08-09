import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
import { AppUser } from '../../models/user';
import { ActionEnum } from '../../enums/action';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.css',
})
export class UserAddComponent {
  addUserForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  action: string = ActionEnum.ADD;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: AppUser
  ) {
    this.addUserForm = new FormGroup({
      name: new FormControl(data?.name ?? '', [Validators.required]),
      firstName: new FormControl(data?.firstName ?? '', [Validators.required]),
      lastName: new FormControl(data?.lastName ?? ''),
      age: new FormControl(data?.age ?? '', [Validators.required]),
      login: new FormControl(data?.login ?? '', [Validators.required]),
      password: new FormControl(data?.password ?? '', [Validators.required]),
      dateRegistration: new FormControl(data?.dateRegistration ?? new Date()),
    });
    this.action = data !== null ? ActionEnum.EDIT : this.action;
    this.addUserForm.get(['dateRegistration'])?.disable();
  }

  addUser() {
    this.addUserForm.get(['dateRegistration'])?.enable();
    this.userService.addUser(this.addUserForm.value).subscribe({
      next: () => this.closeDialog(),
      error: (error) => alert(error),
    });
  }

  editUser() {
    this.addUserForm.get(['dateRegistration'])?.enable();
    this.userService.editUser(this.data.id, this.addUserForm.value).subscribe({
      next: () => this.closeDialog(),
      error: (error) => alert(error),
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
