import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() display = 'menu'; // carousel or list or accordion or menu
  @Input() showHeader = false;
  public carouselInterval = environment.carouselInterval;
  categories$!: Observable<Category[]>;
  subscriptions: Subscription[] = [];
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService
    , private toastService: ToastService, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const element = this.subscriptions[index];
      element.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
  deleteType = '';
  openConfirmation(content: any, id: number, typeName: string) {
    this.deleteType = typeName;
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    modalRef.result.then((result) => {
      if (result == 'Ok click') {
        if (this.deleteType === 'Category') {
          this.deleteCategory(id)
        }
        if (this.deleteType === 'Sub Category') {
          this.deleteSubCategory(id)
        }
      }
    }, (reason) => {
      // this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  deleteCategory(id: number) {
    const subscription = this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.toastService.showSuccess('Category successfully removed!!!');
        this.categories$ = this.categoryService.getCategories();
        this.changeDetectorRef.detectChanges();
      },
      (err) => {
        this.toastService.showError("There was a problem removing the category. Please try again.");
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
  }

  deleteSubCategory(id: number) {
    const subscription = this.categoryService.deleteSubCategory(id).subscribe(
      () => {
        this.toastService.showSuccess('Sub Category successfully removed!!!');
        this.changeDetectorRef.detectChanges();
        this.categories$ = this.categoryService.getCategories();
      },
      (err) => {
        this.toastService.showError("There was a problem removing the category. Please try again.");
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
  }

}
