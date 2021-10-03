import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  subCategories$!: Observable<SubCategory[]>;
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subCategories$ = this.categoryService.getSubCategories();
  }

}
