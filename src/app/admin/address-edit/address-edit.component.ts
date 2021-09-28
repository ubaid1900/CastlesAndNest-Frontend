import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Address } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  @Input() userId!: string;
  addressFormGroup!: FormGroup;
  addUpdateSubscription!: Subscription
  address$!: Observable<Address>

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private addressService: AddressService) { }
  ngOnDestroy(): void {
    this.addUpdateSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.addressFormGroup = this.fb.group({
      streetnumber: [{ value: '', disabled: false }, [Validators.required]],
      streetname: [{ value: '', disabled: false }, []],
      city: [{ value: '', disabled: false }, [Validators.required]],
      state: [{ value: 'Telangana', disabled: false }, [Validators.required]],
      zip: [{ value: '', disabled: false }, [Validators.required]],
      id: [0],
      userId: [this.userId]
    });
    if (this.id === 0) {
      this.address$ = of({} as Address).pipe(tap(address => {
        this.addressFormGroup.patchValue(address);
      }));
    } else {
      this.address$ = this.addressService.getAddress(this.id).pipe(tap(address => {
        this.addressFormGroup.patchValue(address);
      }));
    }
  }
  save() {
    if (this.id === 0) {
      this.addUpdateSubscription = this.addressService.addAddress(this.addressFormGroup.value).subscribe(
        () => { this.activeModal.close("Address added successfully") },
        (err) => { console.error(err); this.activeModal.close("There was a problem adding the address. Please try again."); }
      );
    } else {
      this.addUpdateSubscription = this.addressService.updateAddress(this.addressFormGroup.value).subscribe(
        () => { this.activeModal.close("Address updated successfully") },
        (err) => { console.error(err); this.activeModal.close("There was a problem adding the address. Please try again."); }
      );
    }
  }
}
