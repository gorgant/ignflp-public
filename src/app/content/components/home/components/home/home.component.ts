import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageHeroData } from 'shared-models/components/page-hero-data.model';
import { ImageProps } from 'shared-models/images/image-props.model';
import { metaTagDefaults, metaTagsContentPages } from 'shared-models/meta/metatags.model';
import { WebSiteUrls } from 'shared-models/meta/web-urls.model';
import { PublicAppFragments } from 'shared-models/routes-and-paths/app-fragments.model';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { PublicImagePaths } from 'shared-models/routes-and-paths/image-paths.model';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  heroData!: PageHeroData;
  buildYourOwnPlanUrl: string = WebSiteUrls.IGNFAPP_HOME;
  tryOneOfOursUrl: string = WebSiteUrls.IGNFAPP_HOME;
  fragmentSubscription!: Subscription;

  appFragments = PublicAppFragments;

  @ViewChild('home') homeElementRef!: ElementRef;
  @ViewChild('howItWorks') howItWorksElementRef!: ElementRef;
  @ViewChild('about') aboutElementRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.initializeHeroData();
    this.configSeoAndAnalytics();
  }

  
  ngAfterViewInit(): void {
    this.scrollToFragment();
  }

  private configSeoAndAnalytics() {

    const title = metaTagDefaults.ignflpPublic.metaTagDefaultTitle;
    const description = metaTagDefaults.ignflpPublic.metaTagDefaultDescription;
    const localImagePath = metaTagDefaults.ignflpPublic.metaTagDefaultImage;
    const canonicalUrlPath = PublicAppRoutes.HOME;

    this.analyticsService.setSeoTags(title, description, localImagePath, canonicalUrlPath);

    this.analyticsService.logPageViewWithCustomDimensions(canonicalUrlPath);
  }

  private initializeHeroData() {
    const imageProps: ImageProps = {
      src: PublicImagePaths.HOME,
      sizes: '',
      srcset: '',
      width: '',
    };

    this.heroData = {
      pageTitle: metaTagsContentPages.ignflpPublic.homePageTitle,
      pageHeroSubtitle: metaTagsContentPages.ignflpPublic.homePageSubtitle,
      imageProps,
      actionMessage: metaTagsContentPages.ignflpPublic.homeActionMessage
    };
  }

  // Courtesy of: https://stackoverflow.com/a/52241001/6572208
  // Using this instead of the standard ID to get smooth scrolling behavior
  private scrollToFragment() {
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => { 

      switch (fragment) {
        case this.appFragments.HOME:
          this.homeElementRef.nativeElement.scrollIntoView({behavior: "smooth"});
          break;
        case this.appFragments.HOW_IGNYTE_WORKS:
          this.howItWorksElementRef.nativeElement.scrollIntoView({behavior: "smooth"});
          break;
        case this.appFragments.ABOUT:
          this.aboutElementRef.nativeElement.scrollIntoView({behavior: "smooth"});
          break;
        default:
          break;
      }      
    });
  }

  ngOnDestroy() {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }

}
