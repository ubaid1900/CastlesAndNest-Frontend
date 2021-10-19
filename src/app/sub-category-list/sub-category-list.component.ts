import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

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
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subCategories$ = this.categoryService.getSubCategories();
  }

}
