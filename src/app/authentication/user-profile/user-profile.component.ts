import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddressEditComponent } from 'src/app/admin/address-edit/address-edit.component';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User>;
  userFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private authenticationService: AuthenticationService,
    private router: Router, private toastService: ToastService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      firstname: [{ value: '', disabled: false }, [Validators.required]],
      lastname: [{ value: '', disabled: false }, [Validators.required]],
      phoneNumber: [{ value: '', disabled: false }, [Validators.required]],
      addresses: this.fb.array([])
    });

    this.refresh();
  }
  private refresh() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.email) {
      this.user$ = this.userProfileService.getUser(currentUser)
        .pipe(tap(user => {
          this.userFormGroup.patchValue(user);
          user.addresses?.forEach(address => {
            const addressGroup = this.fb.group({
              streetnumber: [{ value: address.streetnumber, disabled: false }, [Validators.required]],
              streetname: [{ value: address.streetname, disabled: false }, []],
              city: [{ value: address.city, disabled: false }, [Validators.required]],
              state: [{ value: address.state, disabled: false }, [Validators.required]],
              zip: [{ value: address.zip, disabled: false }, [Validators.required]],
              id: [address.id]
            });
            this.addresses.push(addressGroup);
          });
        }));
    }
    else {
      this.router.navigate(['/']);
    }
  }

  public get addresses(): FormArray {
    return this.userFormGroup.get('addresses') as FormArray;
  }
  addAddress() {
    const addressGroup = this.fb.group({
      streetnumber: [{ value: '', disabled: false }, [Validators.required]],
      streetname: [{ value: '', disabled: false }, []],
      city: [{ value: '', disabled: false }, [Validators.required]],
      state: [{ value: 'Telangana', disabled: false }, [Validators.required]],
      zip: [{ value: '', disabled: false }, [Validators.required]],
      id: [0]
    });
    this.addresses.push(addressGroup);
  }
  showAddressDialog(id: number) {
    const currentUser = this.authenticationService.getCurrentUser();
    const modalRef = this.modalService.open(AddressEditComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.userId = currentUser?.email;
    modalRef.result.then((msg) => {
      if (msg) {
        this.toastService.showSuccess(msg);
        this.refresh();
      }
    }).catch(console.error);
  }
  save(email: string) {
    const user: User = { id: email, email: email, ...this.userFormGroup.value };
    this.userProfileService.save(user).subscribe(
      () => {
        this.toastService.showSuccess('Profile successfully saved!!!');
        if (this.route.snapshot.queryParams['returnUrl']) {
          this.router.navigate([this.route.snapshot.queryParams['returnUrl']]);

        }
      },
      (err) => {
        this.toastService.showError("There was a problem saving the profile. Please try again.");
      }
    );
  }

}
