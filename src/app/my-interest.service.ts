import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Interest } from './interest';
import  { environment } from '../environments/environment';

@Injectable()
export class MyInterestService {

  constructor(private http: HttpClient) { }

    getMyInterests(user: string):Observable<Interest[]>{
        // const myUrl = '../assets/data/data.json';
        const myUrl = environment.app_url + `/myInterest/${user}`;

        return this.http.get<Interest[]>(myUrl)
                        .catch(this.errorHandler);
    }

    getAllInterests():Observable<Interest[]>{
        // const myUrl = '../assets/data/data.json';
        const myUrl = environment.app_url + '/allInterests';

        return this.http.get<Interest[]>(myUrl)
                        .catch(this.errorHandler);
    }

    addInterest(interest:Interest):Observable<Interest>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        const user = interest.owner;  // TBD
        const addUrl = environment.app_url + `/myInterest/${user}`;
        return this.http.post<Interest>(addUrl, interest, httpOptions)
                        .catch(this.errorHandler)
    }


    deleteInterest(title:string):Observable<{}>{
        const deleteUrl = environment.app_url + `/myInterest/${title}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.delete(deleteUrl, httpOptions)
                        .catch(this.errorHandler);

    }

    switchLikes(interest:Interest):Observable<any>{
        const username = JSON.parse(localStorage.getItem('currentUser')).username;
        const likeUrl = environment.app_url +`/${username}/isLikedBy`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post<Observable<any>>(likeUrl, interest, httpOptions)
                        .catch(this.errorHandler) ;

    }

    errorHandler(error: HttpErrorResponse){
      return Observable.throw(error.message || "Server Error");
    }



}
