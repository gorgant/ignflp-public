import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/core/services/ui.service';
import { PageHeroData, PageHeroKeys } from 'shared-models/components/page-hero-data.model';
import { PublicImagePaths } from 'shared-models/routes-and-paths/image-paths.model';

@Component({
  selector: 'app-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent implements OnInit, OnDestroy {

  @Input() heroData!: PageHeroData;

  @ViewChild('contentStartTag') ContentStartTag!: ElementRef;


  imageUrl!: string;
  pageTitle!: string;
  pageSubtitle!: string;
  actionMessage!: string | undefined;

  private screenObserverSubscription!: Subscription;
  stylesObject!: {};

  isPost!: boolean;
  fxLayoutAlignValue!: string;

  heroBackgroundImageAlignValue = 'center start';
  heroContentContainerAlignValue = 'end start';
  heroContentContainerFlexValue = '55';
  heroContentContainerMobileFlexValue = '60';
  heroActionContainerFlexValue = '45';
  heroActionContainerMobileFlexValue = '40';

  constructor(
    private sanitizer: DomSanitizer,
    private uiService: UiService
  ) { }

  ngOnInit() {

    this.initializeInputData();

    this.configureBackgroundStyleObject();
  }

  private initializeInputData() {
    this.pageTitle = this.heroData.pageTitle;
    this.pageSubtitle = this.heroData[PageHeroKeys.PAGE_HERO_SUBTITLE];
    this.actionMessage = this.heroData.actionMessage;
    this.imageUrl = this.heroData.imageProps!.src;
  }

  scrollToTextStart() {
    this.ContentStartTag.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private configureBackgroundStyleObject() {

    // Get screen size before setting config
    this.screenObserverSubscription = this.uiService.screenIsMobile$
      .subscribe(screenIsMobile => {

        const backgroundImageUrl = `url(${this.imageUrl})`;
        let linearGradient = 'linear-gradient(0deg, rgba(0,0,0,0.9) 10%, rgba(9,9,121,0.006) 100%)';

        if (this.isPost) {
          linearGradient = 'linear-gradient(0deg, rgba(0,0,0,0.6) 100%, rgba(9,9,121,0.006) 100%)';
        }

        // Increase linear gradient if on mobile for better readability
        if (screenIsMobile) {
          console.log('Screen is mobile');
          linearGradient = 'linear-gradient(0deg, rgba(0,0,0,0.5) 100%, rgba(9,9,121,0.006) 100%)';
        }

        const combinedStyles = `${linearGradient}, ${backgroundImageUrl}`; // Layer in the gradient

        const safeStyles = this.sanitizer.bypassSecurityTrustStyle(`${combinedStyles}`); // Mark string as safe

        this.stylesObject = safeStyles;
      });

  }

  ngOnDestroy() {
    if (this.screenObserverSubscription) {
      this.screenObserverSubscription.unsubscribe();
    }
  }

}
