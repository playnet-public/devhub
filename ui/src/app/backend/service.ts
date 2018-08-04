import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export abstract class BackendService {

    apiUrl: string;
    data: User | Entry | Tag | Tag[] | Entry[];

    constructor(public http: HttpClient) {}
 
    parseData(res: User | Entry) {
        this.data = res;
        return res || {};
    }

    handleError(error: Response | any) {
        let errorMessage: string;
        errorMessage = error.message ? error.message : error.toString();
        if (error.status == 401) {
            errorMessage = '401 Unauthorized: Are you logged in?';
        }
        return Observable.throw(errorMessage);
    }
}