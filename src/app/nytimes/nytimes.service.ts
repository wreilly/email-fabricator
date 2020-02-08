import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NYTimesService {

    nytimesApiUrlStub = 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=';

    constructor(
        private myHttp: HttpClient,
    ) { }

    /* **************************

    1. Get (all?) Top Stories
    2. Get Topmost Top Story

       **************************
     */

    //     1. Get (all?) Top Stories
    getTopStories() {
        let allTopStories = ''; // buncha JSON
        this.myHttp.get(
            `${this.nytimesApiUrlStub}${environment['nytimes-api-key-top-stories']}`,
        ).subscribe(
            (topStoriesWeGotJSON) => {
                console.log('topStoriesWeGotJSON ', topStoriesWeGotJSON);
                allTopStories = 'something y not'; // topStoriesWeGotJSON;
            }
        );
    }

    //     2. Get Topmost Top Story
    getTopmostTopStory() {

    }

}
