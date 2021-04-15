import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LegalBusinessNames, ShorthandBusinessNames } from 'shared-models/meta/business-names.model';
import { metaTagsContentPages } from 'shared-models/meta/metatags.model';
import { WebDomains } from 'shared-models/meta/web-urls.model';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  legalBusinessName = LegalBusinessNames.IGNFLP;
  shorthandBusinessName = ShorthandBusinessNames.IGNFLP;
  businessDomain = WebDomains.IGNFLP;

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.configSeoAndAnalytics();
  }

  // Add async data as needed and fire once loaded
  private configSeoAndAnalytics() {
    const title = metaTagsContentPages.ignflpPublic.privacyPolicyMetaTitle;
    this.titleService.setTitle(title);
  }
}
