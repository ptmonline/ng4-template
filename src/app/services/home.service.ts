import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
    gnomes: any;
    private theurl: any = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    constructor(private http: Http) { }

    getGnomes(): Promise<any> {
        return this.http.get(this.theurl).toPromise().then(data => data.json());
    }
}