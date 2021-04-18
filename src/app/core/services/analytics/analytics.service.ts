import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { metaTagDefaults } from 'shared-models/meta/metatags.model';
import { WebDomains } from 'shared-models/meta/web-urls.model';
import { PartialCustomDimensionsSet } from 'shared-models/analytics/custom-dimensions-set.model';
import { DataLayerService } from './data-layer.service';
import { Router } from '@angular/router';
import { UiService } from '../ui.service';
import { map, take, tap } from 'rxjs/operators';

// Courtesy of: https://medium.com/quick-code/set-up-analytics-on-an-angular-app-via-google-tag-manager-5c5b31e6f41
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private canonicalLink!: HTMLLinkElement;
  private productionEnvironment: boolean = environment.production;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    @Inject(DOCUMENT) private domDoc: Document,
    private dataLayerCustomDimensions: DataLayerService,
    private router: Router,
    private uiService: UiService
  ) {
    // this.checkForAngularUniversal();
  }

  private getFulllUrl(path: string) {
    let origin = '';

    switch (this.productionEnvironment) {
      case true:
        origin = `https://${WebDomains.IGNFLP}`;
        console.log('Prod mode detected, using prod origin', origin);
        break;
      case false:
        origin = 'https://ignflp-public.web.app';
        console.log('Sandbox detected, using sandbox origin', origin);
        break;
      default:
        origin = `https://${WebDomains.IGNFLP}`;
        break;
    }

    let fullPath: string;

    // Handle possible preceding slash
    if (path.charAt(0) === '/') {
      fullPath = `${origin}${path}`;
    } else {
      fullPath = `${origin}/${path}`;
    }
    return fullPath;
  }

  private getFullImagePath(path: string) {

    // Dynamic images will include the full origin in URL (served from Firebase storage)
    if (path.includes('https://')) {
      return path;
    }

    // Statically served assets (e.g. home page background) require origin to be added (served from origin file folder vs firebase storage)
    let origin = '';

    switch (this.productionEnvironment) {
      case true:
        origin = `https://${WebDomains.IGNFLP}`;
        console.log('Prod mode detected, using prod origin', origin);
        break;
      case false:
        origin = 'https://ignflp-public.web.app';
        console.log('Sandbox detected, using sandbox origin', origin);
        break;
      default:
        origin = `https://${WebDomains.IGNFLP}`;
        break;
    }

    const imagePath = `${origin}/${path}`;
    return imagePath;
  }

  setSeoTags(title: string, description: string, imagePath: string, urlPath: string, keywords?: string, type?: string) {

    const fullImagePath = this.getFullImagePath(imagePath);
    // const url = this.fullUrlPath();
    const canonicalUrl = this.getFulllUrl(urlPath);

    this.titleService.setTitle(title);
    this.metaTagService.updateTag({
      name: 'description',
      content: description
    });
    this.metaTagService.updateTag({
      name: 'keywords',
      content: keywords ? keywords : metaTagDefaults.ignflpPublic.metaTagDefaultKeywords
    });

    // Social Media Tags
    this.metaTagService.updateTag({
      property: 'og:title',
      content: title
    });
    this.metaTagService.updateTag({
      property: 'og:description',
      content: description
    });
    this.metaTagService.updateTag({
      property: 'og:image',
      content: fullImagePath
    });
    this.metaTagService.updateTag({
      property: 'og:image:secure_url',
      content: fullImagePath
    });
    this.metaTagService.updateTag({
      property: 'og:image:alt',
      content: title
    });
    this.metaTagService.updateTag({
      property: 'og:url',
      content: canonicalUrl
    });
    this.metaTagService.updateTag({
      property: 'og:type',
      content: type ? type : 'website'
    });

    // Twitter Tags
    this.metaTagService.updateTag({
      name: 'twitter:title',
      content: title,
    });
    this.metaTagService.updateTag({
      name: 'twitter:description',
      content: description,
    });
    this.metaTagService.updateTag({
      name: 'twitter:image:src',
      content: fullImagePath,
    });
    this.metaTagService.updateTag({
      name: 'twitter:image:alt',
      content: title
    });

    // Google+ Tags
    // These require the selector to be specified, otherwise forms duplicate
    this.metaTagService.updateTag({
      itemprop: 'name',
      content: title
    },
    `itemprop='name'`
    );
    this.metaTagService.updateTag({
      itemprop: 'description',
      content: description
    },
    `itemprop='description'`
    );
    this.metaTagService.updateTag({
      itemprop: 'image',
      content: fullImagePath
    },
    `itemprop='image'`
    );

    // Set canonical link (create and append new one if doesn't exist)
    if (!this.canonicalLink) {
      this.canonicalLink = this.domDoc.createElement('link');
      this.canonicalLink.setAttribute('rel', 'canonical');
      this.domDoc.head.appendChild(this.canonicalLink);
    }
    this.canonicalLink.setAttribute('href', canonicalUrl);

  }

  /**
   * Push both page view and custom dimensions (if any) to data layer
   * @url the url after redirects are complete
   * @customDimensions custom dimensions to push to data layer
   * @overridePath optional override the page view url sent to GTM
   */
   logPageViewWithCustomDimensions(overridePath: string, customDimensions?: PartialCustomDimensionsSet): void {

    // // Exit function if bot
    // if (this.isBot) {
    //   console.log('Bot detected, not logging page view');
    //   return;
    // }

    this.uiService.isAngularUniversal
      .pipe(take(1))
      .subscribe(isAngularUniversal => {
        // Exit function if is Angular Universal
        if (isAngularUniversal) {
          console.log('Angular Universal detected, not logging page view');
          return;
        }

        if (!customDimensions) {
          customDimensions = {};
        }

        this.updateCustomDimensions(customDimensions);
        this.logPageView(overridePath);
      });
  }

  private updateCustomDimensions(customDimensions: PartialCustomDimensionsSet) {
    this.dataLayerCustomDimensions.dimensions = customDimensions;
    this.dataLayerCustomDimensions.trigger(); // Push custom dimensions to data layer via service
  }

  private logPageView(overridePath: string) {

    const path = this.router.url; // Will include parameters
    const title = this.titleService.getTitle();
    const fullUrl = this.getFulllUrl(path);

    // Create page view object
    const pageViewObject = {
      event: 'virtualPageview',
      virtualPagePath: overridePath || path, // Prefer overridePath to avoid parameters
      virtualPageTitle: title,
      virtualPageLocation: fullUrl
    };

    console.log('Logging pageview', pageViewObject);

    (window as any).dataLayer.push(pageViewObject); // Push page view to datalayer
  }



}
