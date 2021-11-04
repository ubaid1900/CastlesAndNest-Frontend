import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/services/misc.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUsTextString!: string;

  constructor(private ms: MiscService) { }

  ngOnInit(): void {
    this.aboutUsTextString = this.ms.getAboutUsTextString();
  }

}
