import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubCategoryListComponent implements OnInit {
  @Input() display = 'list'; // carousel or list
  public carouselInterval = environment.carouselInterval;
  subCategories$!: Observable<SubCategory[]>;
  subscriptions: Subscription[] = [];
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService
    , private toastService: ToastService) { }

  ngOnInit(): void {
    this.subCategories$ = this.categoryService.getSubCategories();
  }
  deleteSubCategory(id: number) {
    const subscription = this.categoryService.deleteSubCategory(id).subscribe(
      () => this.toastService.showSuccess('Category successfully removed!!!'),
      (err) => {
        this.toastService.showError("There was a problem removing the category. Please try again.");
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
    this.subCategories$ = this.categoryService.getSubCategories();
  }

}
