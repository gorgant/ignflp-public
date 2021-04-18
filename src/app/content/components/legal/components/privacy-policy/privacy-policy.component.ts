import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BusinessMailingAddresses } from 'shared-models/meta/business-info.model';
import { LegalBusinessNames, ShorthandBusinessNames } from 'shared-models/meta/business-info.model';
import { metaTagsContentPages } from 'shared-models/meta/metatags.model';
import { WebDomains } from 'shared-models/meta/web-urls.model';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  legalBusinessName = LegalBusinessNames.IGNFLP;
  shorthandBusinessName = ShorthandBusinessNames.IGNFLP;
  businessDomain = WebDomains.IGNFLP;
  businessAddress = BusinessMailingAddresses.IGNFLP;

  constructor(
    private titleService: Title,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.configSeoAndAnalytics();
  }

  // Add async data as needed and fire once loaded
  private configSeoAndAnalytics() {
    const title = metaTagsContentPages.ignflpPublic.privacyPolicyMetaTitle;
    const canonicalUrlPath = PublicAppRoutes.PRIVACY_POLICY;
    this.titleService.setTitle(title);
    this.analyticsService.logPageViewWithCustomDimensions(canonicalUrlPath);
  }
}
