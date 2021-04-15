import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ignflp-public';
  appVersion = '0.0.0'

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(
    private uiService: UiService,
  ) {}

  ngOnInit() {
    this.configureSideNav();
  }

  // Handles sideNav clicks
  private configureSideNav() {
    this.uiService.sideNavSignal$.subscribe(signal => {
      this.toggleSideNav();
    });
  }

  // Opens and closes sidenav
  private toggleSideNav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
