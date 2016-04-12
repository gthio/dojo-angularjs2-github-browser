import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserList} from '../user-list/user-list';
import {Github} from '../../services/github';

@Component({
  selector: 'user-browser',
  templateUrl: 'app/components/user-browser/user-browser.html',
  styleUrls: ['app/components/user-browser/user-browser.css'],
  providers: [ Github ],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
@RouteConfig([
	{path: '/',       component: UserList,   name: 'UserList'},
])
export class UserBrowser {

  constructor(private router:Router, private github: Github) {}

  searchForUser(userName: string){
        this.router.navigate(['UserList'])
  }

}