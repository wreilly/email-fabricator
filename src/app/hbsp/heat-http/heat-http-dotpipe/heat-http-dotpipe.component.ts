import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// YES the above NEED to be imported here in Component
// NO it isn't "enough" that they are imported as Modules in my-material.module.ts
// o well

import { HbspService } from '../../hbsp.service';

import { ThreePropsUser, ThreePropsUserFlat } from '../../three-props-user.model';


@Component({
    selector: 'app-heat-http-dotpipe',
    templateUrl: './heat-http-dotpipe.component.html',
    styleUrls: ['./heat-http-dotpipe.component.css'],
})
export class HeatHttpDotPipeComponent implements OnInit, AfterViewInit {

    myEducatorsDataSource = new MatTableDataSource();
    myColumnsToDisplay = ['username', 'email', 'institutionName'];
    @ViewChild(MatPaginator) myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

    @ViewChild(MatSort, {static: false}) mySort: MatSort;

    myHeatAuthorizationsObservableInComponentDotPipe: Observable<object[]>;

    threeUserPropertiesForTableArray: ThreePropsUserFlat[]; // any;
    threeUserPropertiesForTableArrayLength = 0; // for counter on template

    constructor(
        private myHbspService: HbspService,
    ) {
    }

    ngOnInit() {
        // ?
    }

    ngAfterViewInit() {
        this.myEducatorsDataSource.sort = this.mySort;
        this.myEducatorsDataSource.paginator = this.myPaginator;
    }

    myGetHttpHeatUsersFromServiceDotPipe() {
        this.myHeatAuthorizationsObservableInComponentDotPipe = this.myHbspService
            .giveMeHeatUsersDotPipe();

        this.myHeatAuthorizationsObservableInComponentDotPipe.subscribe(
            (currentUserArrayWeGotDotPipe) => {
                this.mySharedSubscribeBothDotPipeAndDotNext(currentUserArrayWeGotDotPipe);
            }
        );

    }

    mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) {

        this.threeUserPropertiesForTableArray = userInfoWeGotFromBothDotPipeAndDotNext
            .map((eachUserInfo) => {
                return {
                    username: eachUserInfo.username,
                    email: eachUserInfo.profile.email,
                    institutionName: eachUserInfo.profile.institutionName,
                };
            });

        this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray.map(
            eachThing => eachThing // map it on, instead of whamma-jamma << YES WORKED
        );
    }

}
