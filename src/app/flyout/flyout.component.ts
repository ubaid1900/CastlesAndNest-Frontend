// https://stackblitz.com/edit/dynamic-nested-menus?file=app%2Fmenu-item%2Fmenu-item.component.html
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category, SubCategory } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.css']
})
export class FlyoutComponent implements OnInit {
  
  @Input() items!: FlyoutItem[];
  @ViewChild('childMenu', {static: true}) public childMenu!: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
export interface FlyoutItem {
  id: number;
  displayName: string;
  iconName?: string;
  route?: string;
  children?: FlyoutItem[];
}