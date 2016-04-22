import {Component, Inject} from 'angular2/core';
import {Github} from '../../services/github';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {InfiniteScrollDirective} from '../directive/infinite-scroll-directive';
import {Injectable} from 'angular2/core';

import 'rxjs/add/operator/map';

@Component({
  selector: 'user-list',
  templateUrl: 'app/components/user-list/user-list.html',
  styleUrls: ['app/components/user-list/user-list.css'],
  providers: [],
  directives: [ ROUTER_DIRECTIVES, InfiniteScrollDirective ],
  pipes: []
})
export class UserList {
  
  users: Observable<any>
  private userObserver: Observer<any> 
    
  constructor(public github: Github, 
    public params: RouteParams) {
  }

  ngOnInit() {
    this.users = new Observable(observer => this.userObserver = observer);
  }
  
  loadMore($event: any){
   
    console.log('Load ' + $event.pageNumber);

    let temp = ($event.pageNumber * 5);
      
    let parameter = this.params.get('searchFor');
      
    let result = this.github.searchUsers('gunawan',
      temp.toString());
      
    result.subscribe(data => {        
      this.userObserver.next(data);  
      });
  }  
}
