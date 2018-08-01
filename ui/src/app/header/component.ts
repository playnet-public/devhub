import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../backend/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userService.checkLogin('auth');
    this.route.data.subscribe(
      (data: { user: User }) => {},
      (error) => undefined,
    );
  }

  public login() {
    window.location.href = environment.apiUrl + '/login?redirect=' + window.location.pathname;
  }

  public logout() {
    window.location.href = environment.apiUrl + '/logout';
  }

  public support() {
    console.log('not implemented yet');
  }
}
