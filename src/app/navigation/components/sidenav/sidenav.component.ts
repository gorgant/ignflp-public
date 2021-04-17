import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/core/services/ui.service';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { PublicAppFragments } from 'shared-models/routes-and-paths/app-fragments.model';
import { WebSiteUrls } from 'shared-models/meta/web-urls.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  appRoutes = PublicAppRoutes;
  appFragments = PublicAppFragments;

  ignyteAppSignup = WebSiteUrls.IGNFAPP_SIGNUP;
  ignyteAppLogin = WebSiteUrls.IGNFAPP_LOGIN;

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  onToggleSideNav() {
    this.uiService.dispatchSideNavClick();
  }

}
