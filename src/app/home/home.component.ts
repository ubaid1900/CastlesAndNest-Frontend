import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlyoutItem } from '../flyout/flyout.component';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private categoryService: CategoryService) {
  }
}
