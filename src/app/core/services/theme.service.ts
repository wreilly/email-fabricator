import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ThemeService {

    private isThemeDarkInServicePrivate$: Subject<boolean> = new Subject<boolean>();

    public isThemeDarkInServicePublic$: Observable<boolean> = this.isThemeDarkInServicePrivate$.asObservable();

    setTheme(lightOrDark: boolean) {
/* No! Not "whamma-jamma" !
        this.isThemeDarkInServicePrivate$ = lightOrDark;

        You do NOT just assign the boolean value.
        You use the Subject's .next() to get
        the value on to it.
*/
        this.isThemeDarkInServicePrivate$.next(lightOrDark);
    }

}
