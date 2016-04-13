import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {Github} from '../../services/github';

@Component({
  selector: 'user-detail',
  templateUrl: 'app/components/user-detail/user-detail.html',
  styleUrls: ['app/components/user-detail/user-detail.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class UserDetail {
  userDetails = {};
  constructor(public routeParams:RouteParams, public github: Github) {}

  ngOnInit() {
    this.github.getUser(this.routeParams.get('name'))
      .subscribe(userDetails => {
        this.userDetails = userDetails;
      });
  }
}
