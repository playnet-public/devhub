import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './service';


@Injectable()
export class TagService extends BackendService {

  apiUrl = environment.apiUrl + '/tags';


  // mock data
  public data: Tag[] = [
    {
      id: '0',
      title: 'featured',
    },
    {
      id: '1',
      title: 'tutorial',
    },
  ];

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }
}