import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomDimensionsSet, PartialCustomDimensionsSet } from 'shared-models/analytics/custom-dimensions-set.model';
import { DataLayerCustomDimensions } from 'shared-models/analytics/data-layer-custom-dimensions.model';

// Courtesy of: https://medium.com/quick-code/set-up-analytics-on-an-angular-app-via-google-tag-manager-5c5b31e6f41
@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  private currentSet!: CustomDimensionsSet;
  private constantDimensions!: PartialCustomDimensionsSet;
  private productionEnvironment: boolean = environment.production;
  private isBot!: boolean;


  constructor() {
    this.generateEmptyDimensionsSet();
  }

  // Update specific custom dimensions in payload
  set dimensions(someDimensions: PartialCustomDimensionsSet) {

    // Get dimensions that need to be sent at every push
    this.constantDimensions = {
      [DataLayerCustomDimensions.PRODUCTION_ENVIRONMENT]: this.productionEnvironment,
      [DataLayerCustomDimensions.IS_BOT]: this.isBot
    };

    // Add both the variable dimensions and the constant dimensions to the data layer object
    Object.keys(DataLayerCustomDimensions).map(key => {
      const wrappedKey = key as 'IS_BOT' | 'PRODUCTION_ENVIRONMENT';
      return DataLayerCustomDimensions[wrappedKey];
    })
    .forEach(key => {
      this.currentSet[key] = someDimensions[key] || this.constantDimensions[key];
    });
  }

  // Push custom dimensions payload to dataLayer
  trigger() {
    (window as any).dataLayer.push(this.currentSet);
    console.log('Pushed these custom dimensions to data layer', this.currentSet);
  }

  // Initialize all possible custom dimensions as undefined (otherwise they will retain previous value)
  private generateEmptyDimensionsSet() {
    this.currentSet = {
      [DataLayerCustomDimensions.PRODUCTION_ENVIRONMENT]: undefined,
      [DataLayerCustomDimensions.IS_BOT]: undefined
    };
  }
}
