import { Component, OnInit } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { filter, flatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  users$!: Observable<User[]>;
  adminUsers$!: Observable<User[]>;
  allUsers$!: Observable<User[]>;
  constructor(private userProfileService: UserProfileService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.users$ = this.userProfileService.getUsers();
    this.adminUsers$ = this.userProfileService.getAdminUsers();

    this.allUsers$ = this.users$.pipe(tap(users => {
      users.forEach(user => {
        this.userIsAdmin(user).subscribe(res => user.isAdmin = res);
        this.allUsers$ = of(users);
      });
    }));
  }
  private userIsAdmin(user: User): Observable<boolean> {
    return this.adminUsers$
      .pipe(
        map(admins => {
          const found = admins.find((admin) => admin.id === user.id)
          return !!found;
        }))
  }
  updateAdminStatus(email: string, evt: any) {
    this.userProfileService.updateAdminRole(email, evt.target.checked).subscribe(
      () => {
        this.toastService.showSuccess('Admin status saved!!!');
      },
      (err) => {
        this.toastService.showError("There was a problem saving the admin status. Please try again.");
      }
    );
  }

}
