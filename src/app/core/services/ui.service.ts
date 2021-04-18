import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  sideNavSignal$ = new Subject<void>();
  screenIsMobile$ = new BehaviorSubject(true);
  private angularUniversalDetected$ = new ReplaySubject<boolean>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: {},
  ) {
    this.monitorScreenSize();
    this.checkForAngularUniversal();
   }

  dispatchSideNavClick() {
    this.sideNavSignal$.next();
  }

  monitorScreenSize() {
    this.breakpointObserver.observe(['(max-width: 959px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Mobile screen detected');
          this.screenIsMobile$.next(true);
        } else {
          console.log('Desktop screen detected');
          this.screenIsMobile$.next(false);
        }
      });

  }

  private checkForAngularUniversal() {
    if (isPlatformServer(this.platformId)) {
      this.angularUniversalDetected$.next(true);
      console.log('Angular Universal detected');
    } else {
      this.angularUniversalDetected$.next(false);
    }
  }

  get isAngularUniversal(): Observable<boolean> {
    return this.angularUniversalDetected$;
  }

}
