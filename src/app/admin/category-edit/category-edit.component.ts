import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category!: Category;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private authenticationService: AuthenticationService,
    private router: Router, private toastService: ToastService, private categoryService: CategoryService, private route: ActivatedRoute,
    private fileService: FileService
    , private duplicateCategoryValidator: DuplicateCategoryValidatorService
  ) { }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [0],
      name:
        [
          { value: '', disabled: false },
          {
            validators: [Validators.required, Validators.minLength(3)],
            asyncValidators: [this.duplicateCategoryValidator.duplicateValidator()],
            updateOn: 'blur'
          }
        ],
      imageUrl: ['']
    }
    );

    this.refresh();
  }
  private refresh() {
    this.category = this.route.snapshot.data.category;
    this.formGroup.patchValue(this.category);
  }
  submit() {
    if (!this.validateImage(this.imageUrl?.value ? 1 : 0)) {
      return;
    }
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

  minImages = 1;
  maxImages = 1;
  validateImage(fileCount: number): boolean {
    let totalFileCount = fileCount;
    if (totalFileCount < this.minImages) {
      this.toastService.showError(`Min ${this.minImages} image(s). Please try again.`);
      return false;
    }
    if (totalFileCount > this.maxImages) {
      this.toastService.showError(`Max ${this.maxImages} images. Please try again.`);
      return false;
    }
    return true;
  }
  onFileSelected(event: any) {

    const files: File[] = event.target.files;
    if (files.length === 0) {
      this.toastService.showError('There was a problem uploading the image(s). Please try again.');
      return;
    }
    if (!this.validateImage(files.length)) {
      return;
    }

    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append("thumbnail", file);
    }

    this.fileService.upload(formData)
      .subscribe((result: string[]) => {

        for (let index = 0; index < result.length; index++) {
          const pi = result[index];
          this.imageUrl?.setValue(`${environment.apiUrl}images/${pi}`);
          this.category.imageUrl = `${environment.apiUrl}images/${pi}`;
        }
        this.toastService.showSuccess('Image(s) successfully uploaded. Please click save to save it with the product.');

      },
        (err => {
          this.toastService.showError('There was a problem uploading the image(s). Please try again.');
          console.error(err);
        }
        ));
  }

  get name() { return this.formGroup.get('name'); }
  get imageUrl() { return this.formGroup.get('imageUrl'); }
}

@Injectable({ providedIn: 'root' })
export class DuplicateCategoryValidatorService {
  constructor(private categoryService: CategoryService) {
  }

  duplicateValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<{ [key: string]: any } | null> => {

      const id = ctrl.parent?.get('id')?.value;
      return this.categoryService.categoryExists(id, ctrl.value).pipe(
        map(isTaken => (isTaken ? { isTaken: true } : null))
      );
    };

  }
}
