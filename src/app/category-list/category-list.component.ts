import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<Category[]>;
  constructor(private categoryService: CategoryService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

}
