import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MiscService } from 'src/app/services/misc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {
  aboutUsTexts: string[] = [];
  isCollapsed = true;

  constructor(private miscService: MiscService) { }

  ngOnInit(): void {
    this.aboutUsTexts = this.miscService.getAboutUs();
  }

}
