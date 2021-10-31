// https://stackblitz.com/edit/dynamic-nested-menus?file=app%2Fmenu-item%2Fmenu-item.component.html
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.css']
})
export class FlyoutComponent implements OnInit {

  @Input() items!: FlyoutItem[];
  @ViewChild('childMenu', { static: true }) public childMenu!: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
export interface FlyoutItem {
  id: number;
  displayName: string;
  iconName?: string;
  route?: string;
  queryParams?: Params | null | undefined;
  children?: FlyoutItem[];
  level: number;
}