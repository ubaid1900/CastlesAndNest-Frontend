import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() display = 'list'; // carousel or list
  public carouselInterval = environment.carouselInterval;
  categories$!: Observable<Category[]>;
  subscriptions: Subscription[] = [];
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService
    , private toastService: ToastService) { }
  ngOnDestroy(): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const element = this.subscriptions[index];
      element.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
  deleteCategory(id: number) {
    const subscription = this.categoryService.deleteCategory(id).subscribe(
      () => this.toastService.showSuccess('Category successfully removed!!!'),
      (err) => {
        this.toastService.showError("There was a problem removing the category. Please try again.");
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
    this.categories$ = this.categoryService.getCategories();
  }

}
