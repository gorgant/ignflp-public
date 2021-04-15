import { Component, OnInit } from '@angular/core';
import { PageHeroData } from 'shared-models/components/page-hero-data.model';
import { ImageProps } from 'shared-models/images/image-props.model';
import { metaTagsContentPages } from 'shared-models/meta/metatags.model';
import { PublicImagePaths } from 'shared-models/routes-and-paths/image-paths.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  heroData!: PageHeroData;
  buildYourOwnPlanUrl: string = '';
  tryOneOfOursUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.initializeHeroData();
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

  private setProductPaths() {
    this.buildYourOwnPlanUrl = `#`;
    // tslint:disable-next-line:max-line-length
    this.tryOneOfOursUrl = `#`;
  }

}
