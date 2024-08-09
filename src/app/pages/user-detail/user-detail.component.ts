import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { JsonTakeService } from '../../services/json-take/json-take.service';
import { AppUser } from '../../models/user';
import { Router } from '@angular/router';
import { UserAddComponent } from '../../modals/user-add-edit/user-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  fullname!: string;
  age!: string;
  dateRegistration!: string;
  subscription!: Subscription;
  selectedUser!: AppUser;

  userSelect: AppUser[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private jsonTakeService: JsonTakeService,
    private router: Router
  ) {
    this.fillUserDetailPage();
  }

  ngOnInit(): void {
    this.getValueJson();
  }

  getValueJson() {
    this.jsonTakeService.getUsersTable().subscribe({
      next: (res) => {
        res.forEach((data) => {
          this.userSelect.push(data);
        });
      },
    });
  }

  fillUserDetailPage() {
    this.subscription = this.userService.onViewUser().subscribe((data) => {
      if (!data.id) {
        this.router.navigate(['home/user']);
      }
      this.selectedUser = data;
      this.fullname =
        data.firstName + ' ' + data.name + ' ' + (data.lastName ?? '');
      this.age = data.age;
      this.dateRegistration = data.dateRegistration;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      data: this.selectedUser,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['home/user']);
    });
  }
}
