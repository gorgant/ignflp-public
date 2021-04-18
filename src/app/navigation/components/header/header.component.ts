import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/core/services/ui.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { PublicAppRoutes } from 'shared-models/routes-and-paths/app-routes.model';
import { ShorthandBusinessNames } from 'shared-models/meta/business-info.model';
import { MatButton } from '@angular/material/button';
import { LogoPaths } from 'shared-models/routes-and-paths/logo-paths.model';
import { PublicAppFragments } from 'shared-models/routes-and-paths/app-fragments.model';
import { WebSiteUrls } from 'shared-models/meta/web-urls.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('matButton') matButton!: MatButton;
  activeUrl$!: Observable<string>;
  appRoutes = PublicAppRoutes;
  shorthandBusinessName = ShorthandBusinessNames.IGNFLP;
  logoPaths = LogoPaths;
  appFragments = PublicAppFragments;
  ignyteAppSignup = WebSiteUrls.IGNFAPP_SIGNUP;
  ignyteAppLogin = WebSiteUrls.IGNFAPP_LOGIN;
  

  constructor(
    private uiService: UiService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Used in template to determine which header content to show
    this.activeUrl$ = this.router.events.pipe(
      filter(event =>
        event instanceof NavigationEnd
      ),
      map(event => {
        return this.router.url;
      })
    );
  }

  // Open/close side nav
  onToggleSidenav() {
    this.uiService.dispatchSideNavClick();
    // Clears sticky focus bug on menu icon
    this.matButton._elementRef.nativeElement.blur();
  }

}
