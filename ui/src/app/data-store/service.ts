import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export abstract class StorageService {

    data: Entry;
    
    constructor() {
    }
}