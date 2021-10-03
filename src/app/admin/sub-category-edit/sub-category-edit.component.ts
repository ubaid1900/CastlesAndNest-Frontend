import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SubCategory, Category } from 'src/app/models/category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.css']
})
export class SubCategoryEditComponent implements OnInit {

  subCategory!: SubCategory;
  categories$!: Observable<Category[]>;
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
        ],
      categoryId: []
    });
    this.categories$ = this.categoryService.getCategories();

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
    this.subCategory = this.route.snapshot.data.subcategory;
    console.dir(this.subCategory);
    this.formGroup.patchValue(this.subCategory);
  }
  submit() {
    const subcategory: SubCategory = { ...this.formGroup.value };
    if (subcategory.id > 0) {
      this.categoryService.updateSubCategory(subcategory).subscribe(
        () => {
          this.toastService.showSuccess('Sub Category successfully saved!!!');
        },
        (err) => {
          this.toastService.showError("There was a problem saving the sub category. Please try again.");
        }
      );
    } else {
      this.categoryService.addSubCategory(subcategory).subscribe(
        (retSubCategory) => {
          this.subCategory = retSubCategory;
          console.log(retSubCategory);

          this.toastService.showSuccess('Sub Category successfully added!!!');

        },
        (err) => {
          this.toastService.showError("There was a problem saving the sub category. Please try again.");
        }
      );

    }
  }
  get name() { return this.formGroup.get('name'); }
  get categoryId() { return this.formGroup.get('categoryId'); }
}
