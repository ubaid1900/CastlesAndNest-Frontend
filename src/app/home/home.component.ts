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
  items!: FlyoutItem[];
  ngOnInit(): void {
    // this.items = this.getSampleItems();
  }
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        if (!this.items) {
          this.items = [{ id: 0, displayName: "Explore Categories", children: [] }];
        }
        categories.forEach(category => {
          const flyoutItem = { id: category.id, displayName: category.name, children: [] } as FlyoutItem;
          category.subCategories.forEach(sc => {
            flyoutItem.children?.push({
              id: sc.id, displayName: sc.name, route: `/productSearch`, queryParams:sc.id.toString()
            });
          });
          this.items[0].children?.push(flyoutItem);
        });
      },
      (err) => { console.error(err) }
    );
  }
  getSampleItems(): FlyoutItem[] {
    const items: FlyoutItem[] = [
      {
        id: 0,
        displayName: 'AngularMix',
        iconName: 'close',
        children: [
          {
            id: 0,
            displayName: 'Speakers',
            iconName: 'group',
            children: [
              {
                id: 0,
                displayName: 'Michael Prentice',
                iconName: 'person',
                route: 'michael-prentice',
                children: [
                  {
                    id: 0,
                    displayName: 'Delight your Organization',
                    iconName: 'star_rate',
                    route: 'material-design'
                  }
                ]
              },
              {
                id: 0,
                displayName: 'Stephen Fluin',
                iconName: 'person',
                route: 'stephen-fluin',
                children: [
                  {
                    id: 0,
                    displayName: 'What\'s up with the Web?',
                    iconName: 'star_rate',
                    route: 'what-up-web'
                  }
                ]
              },
              {
                id: 0,
                displayName: 'Mike Brocchi',
                iconName: 'person',
                route: 'mike-brocchi',
                children: [
                  {
                    id: 0,
                    displayName: 'My ally, the CLI',
                    iconName: 'star_rate',
                    route: 'my-ally-cli'
                  },
                  {
                    id: 0,
                    displayName: 'Become an Angular Tailor',
                    iconName: 'star_rate',
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
            children: [
              {
                id: 0,
                displayName: 'Delight your Organization',
                iconName: 'star_rate',
                route: 'material-design'
              },
              {
                id: 0,
                displayName: 'What\'s up with the Web?',
                iconName: 'star_rate',
                route: 'what-up-web'
              },
              {
                id: 0,
                displayName: 'My ally, the CLI',
                iconName: 'star_rate',
                route: 'my-ally-cli'
              },
              {
                id: 0,
                displayName: 'Become an Angular Tailor',
                iconName: 'star_rate',
                route: 'become-angular-tailer'
              }
            ]
          },
          {
            id: 0,
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
