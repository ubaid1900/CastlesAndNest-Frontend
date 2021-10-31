import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    , private toastService: ToastService, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subCategories$ = this.categoryService.getSubCategories();
  }
  deleteType = '';
  openConfirmation(content: any, id: number, typeName: string) {
    this.deleteType = typeName;
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    modalRef.result.then((result) => {
      if (result == 'Ok click') {
        if (this.deleteType === 'Sub Category') {
          this.deleteSubCategory(id)
        }
      }
    }, (reason) => {
      // this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  deleteSubCategory(id: number) {
    const subscription = this.categoryService.deleteSubCategory(id).subscribe(
      () => {
        this.toastService.showSuccess('Sub Category successfully removed!!!');
        this.subCategories$ = this.categoryService.getSubCategories();
        this.changeDetectorRef.detectChanges();
      },
      (err) => {
        this.toastService.showError("There was a problem removing the category. Please try again.");
        console.error(err);
      }
    );
    this.subscriptions.push(subscription);
  }
}
