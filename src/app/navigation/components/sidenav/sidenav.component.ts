import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/core/services/ui.service';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { PublicAppFragments } from 'shared-models/routes-and-paths/app-fragments.model';
import { WebSiteUrls } from 'shared-models/meta/web-urls.model';
import { GtmTagClasses } from 'shared-models/analytics/gtm-tags.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  appRoutes = PublicAppRoutes;
  appFragments = PublicAppFragments;

  ignyteAppSignupUrl = WebSiteUrls.IGNFAPP_SIGNUP;
  ignyteAppLoginUrl = WebSiteUrls.IGNFAPP_LOGIN;
  beginLoginTag = GtmTagClasses.BEGIN_LOGIN_TAG
  beginSignupTag = GtmTagClasses.BEGIN_SIGNUP_TAG;
  viewHowIgnyteWorksTag = GtmTagClasses.VIEW_HOW_IGNYTE_WORKS_TAG;
  viewAboutUsTag = GtmTagClasses.VIEW_ABOUT_US_TAG;

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  onToggleSideNav() {
    this.uiService.dispatchSideNavClick();
  }

}
