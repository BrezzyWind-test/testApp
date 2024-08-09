import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from '../../models/user';
import { JsonTakeService } from '../../services/json-take/json-take.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../../services/filter/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../../modals/user-add-edit/user-add-edit.component';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  dataSource!: MatTableDataSource<AppUser, MatPaginator>;
  usersTableData: AppUser[] = [];
  displayedColumns = ['id', 'fullName', 'age', 'dateRegistration'];
  filterForm!: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(
    private jsonTakeService: JsonTakeService,
    private filterService: FilterService,
    private router: Router,
    private userService: UserService
  ) {
    this.filterForm = new FormGroup({
      pickerDateFrom: new FormControl('', { updateOn: 'blur' }),
      pickerDateTo: new FormControl('', { updateOn: 'blur' }),
      ageFrom: new FormControl('', { updateOn: 'blur' }),
      ageTo: new FormControl('', { updateOn: 'blur' }),
      fullName: new FormControl(''),
    });

    this.filterForm.valueChanges.subscribe((data) => {
      if (
        data.pickerDateFrom &&
        data.pickerDateTo &&
        data.pickerDateFrom > data.pickerDateTo
      ) {
        this.filterForm.controls['pickerDateTo'].reset();
      }
      if (data.ageTo && data.ageFrom && data.ageFrom > data.ageTo) {
        this.filterForm.controls['ageTo'].reset();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.filter();
      });
  }

  ngOnInit(): void {
    this.jsonTakeService.getUsersTable().subscribe({
      next: (res) => {
        res.forEach((data) => {
          this.usersTableData.push(data);
        });
        this.dataSource = new MatTableDataSource(this.usersTableData);
      },
    });
  }

  filterDate = (d: Date | null): boolean => {
    const date = d || new Date();
    return date <= new Date();
  };

  filterToDate = (d: Date | null): boolean => {
    const date = d || new Date();
    const dateFrom = this.filterForm.get('pickerDateFrom')?.value;
    if (dateFrom) {
      return date <= new Date() && date >= dateFrom;
    } else return date <= new Date();
  };

  filter() {
    this.filterService.filterUsers(this.filterForm.value).subscribe({
      next: (data) => {
        this.usersTableData = [];
        data = this.filterRows(data);
        data.forEach((data) => {
          this.usersTableData.push(data);
        });
        this.dataSource = new MatTableDataSource(this.usersTableData);
      },
      error: (error) => alert(error),
    });
  }

  filterRows(data: AppUser[]): AppUser[] {
    data = this.filterForm.get(['pickerDateFrom'])?.value
      ? data.filter(
          (value) =>
            new Date(value.dateRegistration).getTime() >=
            this.filterForm.get(['pickerDateFrom'])?.value.getTime()
        )
      : data;
    data = this.filterForm.get(['pickerDateTo'])?.value
      ? data.filter(
          (value) =>
            new Date(value.dateRegistration).getTime() <=
            this.filterForm.get(['pickerDateTo'])?.value.getTime()
        )
      : data;
    data = this.filterForm.get(['ageFrom'])?.value
      ? data.filter(
          (value) => value.age >= this.filterForm.get(['ageFrom'])?.value
        )
      : data;
    data = this.filterForm.get(['ageTo'])?.value
      ? data.filter(
          (value) => value.age <= this.filterForm.get(['ageTo'])?.value
        )
      : data;
    data = this.filterForm.get(['fullName'])?.value
      ? data.filter((value) => {
          const valueFullName =
            value.firstName + ' ' + value.name + ' ' + (value.lastName! ?? '');
          return valueFullName.includes(
            this.filterForm.get(['fullName'])?.value
          );
        })
      : data;
    return data;
  }

  getRecord(row: AppUser) {
    this.userService.changeAppUser(row);
    this.router.navigate([`home/user/${row.id}`]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAddComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.filter();
    });
  }
}
