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
  
  @Input() items!: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu!: any;

  categories$!: Observable<Category[]>;
  categories!: Category[];
  constructor(private categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    // this.items = this.getSampleItems();
    this.categories$ = this.categoryService.getCategories();
  }
  getSampleItems(): NavItem[] {
    const items: NavItem[] = [
      {
        displayName: 'AngularMix',
        iconName: 'close',
        children: [
          {
            displayName: 'Speakers',
            iconName: 'group',
            children: [
              {
                displayName: 'Michael Prentice',
                iconName: 'person',
                route: 'michael-prentice',
                children: [
                  {
                    displayName: 'Delight your Organization',
                    iconName: 'star_rate',
                    route: 'material-design'
                  }
                ]
              },
              {
                displayName: 'Stephen Fluin',
                iconName: 'person',
                route: 'stephen-fluin',
                children: [
                  {
                    displayName: 'What\'s up with the Web?',
                    iconName: 'star_rate',
                    route: 'what-up-web'
                  }
                ]
              },
              {
                displayName: 'Mike Brocchi',
                iconName: 'person',
                route: 'mike-brocchi',
                children: [
                  {
                    displayName: 'My ally, the CLI',
                    iconName: 'star_rate',
                    route: 'my-ally-cli'
                  },
                  {
                    displayName: 'Become an Angular Tailor',
                    iconName: 'star_rate',
                    route: 'become-angular-tailer'
                  }
                ]
              }
            ]
          },
          {
            displayName: 'Sessions',
            iconName: 'speaker_notes',
            children: [
              {
                displayName: 'Delight your Organization',
                iconName: 'star_rate',
                route: 'material-design'
              },
              {
                displayName: 'What\'s up with the Web?',
                iconName: 'star_rate',
                route: 'what-up-web'
              },
              {
                displayName: 'My ally, the CLI',
                iconName: 'star_rate',
                route: 'my-ally-cli'
              },
              {
                displayName: 'Become an Angular Tailor',
                iconName: 'star_rate',
                route: 'become-angular-tailer'
              }
            ]
          },
          {
            displayName: 'Feedback',
            iconName: 'feedback',
            route: 'feedback'
          }
        ]
      }
    ];
    return items;
  }

}
export interface NavItem {
  displayName: string;
  iconName: string;
  route?: string;
  children?: NavItem[];
}