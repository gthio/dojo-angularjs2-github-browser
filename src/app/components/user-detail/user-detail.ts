import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {CalendarPipe} from 'angular2-moment/';
import {Github} from '../../services/github';

@Component({
  selector: 'user-detail',
  templateUrl: 'app/components/user-detail/user-detail.html',
  styleUrls: ['app/components/user-detail/user-detail.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [CalendarPipe]
})
export class UserDetail {
  userDetails = {};
  userRepos = [];
  
  constructor(public routeParams:RouteParams, public github: Github) {}

  ngOnInit() {
    this.github.getUser(this.routeParams.get('name'))
      .subscribe(userDetails => {
        this.userDetails = userDetails;
      });
      
    this.github.getReposForUser(this.routeParams.get('name'))   
      .subscribe(userRepos => {
        this.userRepos = userRepos;
      });     
  }
}
