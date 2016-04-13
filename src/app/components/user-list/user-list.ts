import {Component} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'user-list',
  templateUrl: 'app/components/user-list/user-list.html',
  styleUrls: ['app/components/user-list/user-list.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class UserList {
  users: Observable<any>
  constructor(public github: Github, public params: RouteParams) {}

  ngOnInit() {
    let parameter = this.params.get('searchFor');

    this.users = this.github.searchUsers(parameter);
  }
}
