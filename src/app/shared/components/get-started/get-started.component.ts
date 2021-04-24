import { Component, Input, OnInit } from '@angular/core';
import { GtmTagClasses } from 'shared-models/analytics/gtm-tags.model';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {

  @Input() customPlanUrl!: string;
  @Input() prebuiltPlanUrl!: string;

  customPlanTagClass = GtmTagClasses.CREATE_CUSTOM_PLAN_TAG;
  prebuiltPlanTagClass = GtmTagClasses.CREATE_PREBUILT_PLAN_TAG;

  constructor() { }

  ngOnInit(): void {
  }

}
