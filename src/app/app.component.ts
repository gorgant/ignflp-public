import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { metaTagDefaults } from 'shared-models/meta/metatags.model';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { AnalyticsService } from './core/services/analytics.service';
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = metaTagDefaults.ignflpPublic.metaTagDefaultTitle;
  appVersion = '0.0.2'

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(
    private uiService: UiService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.configureSideNav();
    this.configSeoAndAnalytics();
  }

  private configSeoAndAnalytics() {

    const title = metaTagDefaults.ignflpPublic.metaTagDefaultTitle;
    const description = metaTagDefaults.ignflpPublic.metaTagDefaultDescription;
    const localImagePath = metaTagDefaults.ignflpPublic.metaTagDefaultImage;
    const canonicalUrlPath = PublicAppRoutes.HOME;

    this.analyticsService.setSeoTags(title, description, localImagePath, canonicalUrlPath);
  }

  // Handles sideNav clicks
  private configureSideNav() {
    this.uiService.sideNavSignal$.subscribe(signal => {
      this.toggleSideNav();
    });
  }

  // Opens and closes sidenav
  private toggleSideNav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
