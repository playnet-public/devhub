import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { PageService } from '../backend/page.service';
import { TagService } from '../backend/tag.service';

import { ActivatedRoute, Router }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class PagesComponent implements OnInit {

  public activeTag: string = '';
  public activePage: string = '';

  constructor(
    public tags: TagService,
    public pages: PageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.activeTag = params.get('tagId');
        this.activePage = params.get('pageId');
        this.pages.data = this.pages.mockPages;
        if (this.activeTag != undefined && this.activeTag.length > 0) {
          this.pages.data = this.pages.getByTag(this.activeTag);
        }
      });
  }

  clickTag(tag: Tag) {
    if (this.activeTag == tag.id) {
      this.activeTag = '';
      this.router.navigate(['/pages']);
    } else {
      this.router.navigate(['/pages/tag', tag.id]);
    }
  }

  clickPage(page: Entry) {
    if (this.activePage == page.id) {
      this.activePage = null;
      this.router.navigate(['/pages']);
    } else {
      this.router.navigate(['/pages', page.id]);
    }
  }
}
