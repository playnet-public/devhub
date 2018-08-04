import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { PageService } from '../backend/page.service';
import { TagService } from '../backend/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class TagsComponent implements OnInit {

  constructor(
    public tags: TagService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  filterTag(tag: string) {
    this.router.navigate(['/', 'tags', tag]);
  }
}
