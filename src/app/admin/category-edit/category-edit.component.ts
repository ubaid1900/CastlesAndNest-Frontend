import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category!: Category;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private authenticationService: AuthenticationService,
    private router: Router, private toastService: ToastService, private categoryService: CategoryService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [0],
      name:
        [
          { value: '', disabled: false }
          , [Validators.required, Validators.minLength(3)]
        ]
    });
    // this.formGroup = this.fb.group({
    //   name: 
    //   [{ value: '', disabled: false },
    //   // validators: 
    //   [Validators.required, Validators.minLength(3)]
    //   , 
    //   // asyncValidators: 
    //   // [duplicateCategoryValidator]
    //   // ,
    //   // updateOn
    //   'blur']
    // });

    this.refresh();
  }
  private refresh() {
    this.category = this.route.snapshot.data.category;
    console.dir(this.category);
    this.formGroup.patchValue(this.category);
  }
  submit() {
    const category: Category = { ...this.formGroup.value };
    if (category.id > 0) {
      this.categoryService.updateCategory(category).subscribe(
        () => {
          this.toastService.showSuccess('category successfully saved!!!');
        },
        (err) => {
          this.toastService.showError("There was a problem saving the category. Please try again.");
        }
      );
    } else {
      this.categoryService.addCategory(category).subscribe(
        (retCategory) => {
          this.category = retCategory;
          console.log(retCategory);

          this.toastService.showSuccess('Category successfully added!!!');

        },
        (err) => {
          this.toastService.showError("There was a problem saving the category. Please try again.");
        }
      );

    }
  }
  get name() { return this.formGroup.get('name'); }
}

@Injectable({ providedIn: 'root' })
export class duplicateCategoryValidator implements AsyncValidator {
  constructor(private categoryService: CategoryService) {
    debugger;
  }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.categoryService.categoryExists(ctrl.value).pipe(
      map(isTaken => (isTaken ? { isTaken: true } : null)),
      catchError(() => of(null))
    );
  }
}