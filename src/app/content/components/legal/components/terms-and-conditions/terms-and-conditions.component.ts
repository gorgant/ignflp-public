import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LegalBusinessNames } from 'shared-models/meta/business-info.model';
import { metaTagsContentPages } from 'shared-models/meta/metatags.model';
import { WebDomains } from 'shared-models/meta/web-urls.model';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';


@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  appRoutes = PublicAppRoutes;
  legalBusinessName = LegalBusinessNames.IGNFLP;
  businessDomain =  WebDomains.IGNFLP;

  constructor(
    private titleService: Title,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.configSeoAndAnalytics();
  }

  // Add async data as needed and fire once loaded
  private configSeoAndAnalytics() {
    const title = metaTagsContentPages.ignflpPublic.termsAndConditionsMetaTitle;
    const canonicalUrlPath = PublicAppRoutes.PRIVACY_POLICY;
    this.titleService.setTitle(title);
    this.analyticsService.logPageViewWithCustomDimensions(canonicalUrlPath);
  }

}
