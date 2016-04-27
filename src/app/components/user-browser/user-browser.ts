import {Component, Inject} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserList} from '../user-list/user-list';
import {UserDetail} from '../user-detail/user-detail';
import {Github} from '../../services/github';
import {WINDOW, WINDOW_PROVIDERS} from '../../services/window-service';

@Component({
  selector: 'user-browser',
  templateUrl: 'app/components/user-browser/user-browser.html',
  styleUrls: ['app/components/user-browser/user-browser.css'],
  providers: [ Github, WINDOW_PROVIDERS ],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
@RouteConfig([
	{path: '/',       component: UserList,      name: 'UserList'},
  {path: '/:name',  component: UserDetail,    name: 'UserDetail'},
])
export class UserBrowser {

  constructor(private router:Router, 
    private github: Github) {
  }

  searchForUser(searchKey: string){
    this.router.navigate(['UserList', {searchValue: searchKey, 
      location: 'Singapore',
      language: 'Javascript'}]);
  }
}