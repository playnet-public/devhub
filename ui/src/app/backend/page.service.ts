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
export class PageService extends BackendService {

  apiUrl = environment.apiUrl + '/pages';


  // content will not be fetched for all pages
  // once a page get's opened, the content get's called and stored inside `page`
  // for demo/testing purposes we store it until we got a backend
  public page: Entry;
  public data: Entry[] = [];

  public mockPages: Entry[] = [
    {
      id: '0',
      title: 'Introducing the DevHub',
      author: 'Team',
      updated: new Date('1/1/16'),
      tags: [
        {
          id: '0',
          title: 'featured',
        },
      ],
      content: 'Introduction Foo Bar',
    },
    {
      id: '1',
      title: 'Linux Server Best Practices',
      author: 'Example User',
      updated: new Date('1/1/16'),
      tags: [],
      content: 'Don\'t `rm -Rf /',
    },
    {
      id: '2',
      title: 'Getting Started on Golang',
      author: 'PlayNet',
      updated: new Date('1/1/16'),
      tags: [
        {
          id: '1',
          title: 'tutorial',
        },
      ],
      content: 'Golang rocks, so let\'s hop on',
    },
  ];

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getByTag(tag: string): Entry[] {
    if (tag == undefined || tag == '') {
      return this.data;
    }
    return this.data.filter(this.hasTag(tag));
  }

  hasTag(tag: string) {
    return function (entry: Entry, index: number, array: Entry[]): boolean {
      let result = false;
      entry.tags.forEach(function (value: Tag, index: number, array: Tag[]) {
        if (value.id === tag) {
          result = true;
        }
      });
      return result;
    }
  }

  getIcon(page: Entry) {
    for (var i = 0, len = page.tags.length; i < len; i++) {
      switch (page.tags[i].id) {
        case '0':
          return 'assistant';
        case '1':
          return 'school';
        default:
          break;
      }
    }
    return 'description';
  }

  getPage(id: string): Entry {
    for (var i = 0, len = this.data.length; i < len; i++) {
      if (this.data[i].id == id) {
        return this.data[i];
      }
    }
    return;
  }
}