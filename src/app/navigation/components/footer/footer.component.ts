import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { now } from 'moment';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { SocialUrls } from 'shared-models/meta/social-urls.model';
import { LegalBusinessNames } from 'shared-models/meta/business-info.model';
import { PublicIconPaths } from 'shared-models/routes-and-paths/icon-paths.model';
import { PublicAppFragments } from 'shared-models/routes-and-paths/app-fragments.model';
import { GtmTagClasses } from 'shared-models/analytics/gtm-tags.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() appVersion!: string;
  showAppVersion = false;
  legalBusinessName = LegalBusinessNames.IGNFLP;
  socialIconPaths = PublicIconPaths;
  appFragments = PublicAppFragments;

  activeUrl$!: Observable<string>;
  appRoutes = PublicAppRoutes;
  socialUrls = SocialUrls;
  currentDate!: number;

  viewHowIgnyteWorksTag = GtmTagClasses.VIEW_HOW_IGNYTE_WORKS_TAG;
  viewAboutUsTag = GtmTagClasses.VIEW_ABOUT_US_TAG;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // Used in template to determine which header content to show
    this.activeUrl$ = this.router.events.pipe(
      filter(event =>
        event instanceof NavigationEnd
      ),
      map(event => {
        return this.router.url;
      })
    );

    this.currentDate = now();
  }

  toggleShowAppVersion() {
    this.showAppVersion = !this.showAppVersion;
  }

}
