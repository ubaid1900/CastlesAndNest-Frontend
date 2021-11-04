import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/services/misc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  carouselInterval = 0;
  aboutUsTexts: string[] = [];
  private _isCollapsed = true;
  public get isCollapsed() {
    return this._isCollapsed;
  }
  public set isCollapsed(value) {
    this._isCollapsed = value;
    if (value) {
      this.carouselInterval = 0;
    }
    else {
      this.carouselInterval = environment.carouselInterval;
    }
  }

  constructor(private miscService: MiscService) { }

  ngOnInit(): void {
    this.aboutUsTexts = this.miscService.getAboutUs();
  }

}
