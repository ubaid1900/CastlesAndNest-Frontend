import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompanyInfo } from '../models/company-info';
import { MiscService } from '../services/misc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
companyInfo$!: Observable<ICompanyInfo>;
  constructor(private miscService: MiscService) { }

  ngOnInit(): void {
    this.companyInfo$ = this.miscService.getCompanyInfo();
  }

}
