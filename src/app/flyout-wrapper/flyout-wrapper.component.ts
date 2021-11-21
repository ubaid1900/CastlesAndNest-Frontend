import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlyoutItem } from '../flyout/flyout.component';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-flyout-wrapper',
  templateUrl: './flyout-wrapper.component.html',
  styleUrls: ['./flyout-wrapper.component.css']
})
export class FlyoutWrapperComponent implements OnInit, OnDestroy {
  items!: FlyoutItem[];
  subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService) {
  }
  ngOnDestroy(): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const element = this.subscriptions[index];
      element.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.items = this.getSampleItems();
    const subscription = this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        if (!this.items) {
          this.items = [{ id: 0, displayName: "Explore Categories", children: [], level: 0 }];
        }
        categories.forEach(category => {
          const flyoutItem =
            { id: category.id, displayName: category.name, children: [], route: `./productSearch`, queryParams: { catId: category.id.toString() }, level: 1 } as FlyoutItem;
            if (category.subCategories && category.subCategories.length > 0) {
              flyoutItem.children?.push(
                { id: category.id, displayName: 'Browse all', children: [], route: `./productSearch`, queryParams: { catId: category.id.toString() }, level: 1 } as FlyoutItem
              );
            }
          category.subCategories.forEach(sc => {
            flyoutItem.children?.push({
              id: sc.id, displayName: sc.name, route: `./productSearch`, queryParams: { subCatId: sc.id.toString() }, level: 2
            });
          });
          this.items[0].children?.push(flyoutItem);
        });
      },
      (err) => { console.error(err) }
    );
    this.subscriptions.push(subscription);
  }

  getSampleItems(): FlyoutItem[] {
    const items: FlyoutItem[] = [
      {
        id: 0,
        displayName: 'AngularMix',
        level: 0,
        iconName: 'close',
        children: [
          {
            id: 0,
            displayName: 'Speakers',
            iconName: 'group',
            level: 0,
            children: [
              {
                id: 0,
                displayName: 'Michael Prentice',
                iconName: 'person',
                route: 'michael-prentice',
                level: 0,
                children: [
                  {
                    id: 0,
                    displayName: 'Delight your Organization',
                    iconName: 'star_rate',
                    level: 0,
                    route: 'material-design'
                  }
                ]
              },
              {
                id: 0,
                displayName: 'Stephen Fluin',
                iconName: 'person',
                level: 0,
                route: 'stephen-fluin',
                children: [
                  {
                    id: 0,
                    displayName: 'What\'s up with the Web?',
                    iconName: 'star_rate',
                    level: 0,
                    route: 'what-up-web'
                  }
                ]
              },
              {
                id: 0,
                displayName: 'Mike Brocchi',
                iconName: 'person',
                level: 0,
                route: 'mike-brocchi',
                children: [
                  {
                    id: 0,
                    displayName: 'My ally, the CLI',
                    iconName: 'star_rate',
                    level: 0,
                    route: 'my-ally-cli'
                  },
                  {
                    id: 0,
                    displayName: 'Become an Angular Tailor',
                    iconName: 'star_rate',
                    level: 0,
                    route: 'become-angular-tailer'
                  }
                ]
              }
            ]
          },
          {
            id: 0,
            displayName: 'Sessions',
            iconName: 'speaker_notes',
            level: 0,
            children: [
              {
                id: 0,
                displayName: 'Delight your Organization',
                iconName: 'star_rate',
                level: 0,
                route: 'material-design'
              },
              {
                id: 0,
                displayName: 'What\'s up with the Web?',
                iconName: 'star_rate',
                level: 0,
                route: 'what-up-web'
              },
              {
                id: 0,
                displayName: 'My ally, the CLI',
                iconName: 'star_rate',
                level: 0,
                route: 'my-ally-cli'
              },
              {
                id: 0,
                displayName: 'Become an Angular Tailor',
                iconName: 'star_rate',
                level: 0,
                route: 'become-angular-tailer'
              }
            ]
          },
          {
            id: 0,
            displayName: 'Feedback',
            iconName: 'feedback',
            level: 0,
            route: 'feedback'
          }
        ]
      }
    ];
    return items;
  }

}
