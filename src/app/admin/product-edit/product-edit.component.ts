import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, SubCategory } from 'src/app/models/category';
import { Product, Unit } from 'src/app/models/Product';
import { ProductService } from 'src/app/product.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public Editor = ClassicEditor;
  product!: Product;
  categories$!: Observable<Category[]>;
  subcategories$!: Observable<SubCategory[]>;
  lengthUnits$!: Observable<Unit[]>;
  weigthUnits$!: Observable<Unit[]>;
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private authenticationService: AuthenticationService,
    private router: Router, private productService: ProductService, private toastService: ToastService, private categoryService: CategoryService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.formGroup = this.fb.group({
      id: [0],
      name:
        [
          { value: '', disabled: false }
          , [Validators.required, Validators.minLength(3)]
        ],
      description:
        [
          { value: '', disabled: false }
          , [Validators.required, Validators.minLength(3)]
        ],
      price:
        [
          { value: '', disabled: false }
          , [Validators.required]
        ],
      availableQuantity:
        [
          { value: 0, disabled: false }
        ],
      exclude:
        [
          { value: false, disabled: false }
        ],
      reorderLevel:
        [
          { value: '', disabled: false }
        ],
      color:
        [
          { value: '', disabled: false }
        ],
      length:
        [
          { value: '', disabled: false }
        ],
      lengthUnit:
        [
          { value: '', disabled: false }
        ],
      width:
        [
          { value: '', disabled: false }
        ],
      widthUnit:
        [
          { value: '', disabled: false }
        ],
      height:
        [
          { value: '', disabled: false }
        ],
      heightUnit:
        [
          { value: '', disabled: false }
        ],
      weight:
        [
          { value: '', disabled: false }
        ],
      weightUnit:
        [
          { value: '', disabled: false }
        ],
      amazonLink:
        [
          { value: '', disabled: false }
          , [Validators.required, Validators.minLength(3), Validators.pattern(reg)]
        ],
      flipkartLink:
        [
          { value: '', disabled: false }
          , [Validators.minLength(3), Validators.pattern(reg)]
        ],
      categoryId: [
        { value: '', disabled: false }
      ],
      subcategoryId: []
    });
    this.categories$ = this.categoryService.getCategories();
    this.subcategories$ = this.categoryService.getSubCategories();
    this.lengthUnits$ = this.productService.getLengthUnits();
    this.weigthUnits$ = this.productService.getWeigthUnits();

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
    this.product = this.route.snapshot.data.product;
    this.formGroup.patchValue(this.product);
  }
  submit() {
    const product: Product = { ...this.formGroup.value };
    if (product.id > 0) {
      this.productService.updateProduct(product).subscribe(
        () => {
          this.toastService.showSuccess('Product successfully saved!!!');
        },
        (err) => {
          this.toastService.showError("There was a problem saving the product. Please try again.");
        }
      );
    } else {
      this.productService.addProduct(product).subscribe(
        (retProduct) => {
          this.product = retProduct;
          console.log(retProduct);

          this.toastService.showSuccess('Product successfully added!!!');

        },
        (err) => {
          this.toastService.showError("There was a problem saving the product. Please try again.");
        }
      );

    }
  }
  get name() { return this.formGroup.get('name'); }
  get description() { return this.formGroup.get('description'); }
  get price() { return this.formGroup.get('price'); }
  get availableQuantity() { return this.formGroup.get('availableQuantity'); }
  get exclude() { return this.formGroup.get('exclude'); }
  get reorderLevel() { return this.formGroup.get('reorderLevel'); }
  get color() { return this.formGroup.get('color'); }
  get length() { return this.formGroup.get('length'); }
  get lengthUnit() { return this.formGroup.get('lengthUnit'); }
  get width() { return this.formGroup.get('width'); }
  get widthUnit() { return this.formGroup.get('widthUnit'); }
  get height() { return this.formGroup.get('height'); }
  get heightUnit() { return this.formGroup.get('heightUnit'); }
  get weight() { return this.formGroup.get('weight'); }
  get weightUnit() { return this.formGroup.get('weightUnit'); }
  get amazonLink() { return this.formGroup.get('amazonLink'); }
  get flipkartLink() { return this.formGroup.get('flipkartLink'); }
  get categoryId() { return this.formGroup.get('categoryId'); }
  get subcategoryId() { return this.formGroup.get('subcategoryId'); }
}
