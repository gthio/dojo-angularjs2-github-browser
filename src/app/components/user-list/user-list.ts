import {Component, Inject} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {InfiniteScrollDirective} from '../directive/infinite-scroll-directive';

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
    items = [];
    
  constructor(public github: Github, public params: RouteParams) {}

  ngOnInit() {
    let parameter = this.params.get('searchFor');

    this.users = this.github.searchUsers(parameter);
  }
  
  loadMore($event: any){
   
    console.log('Load ' + $event.pageNumber);
    
    for (var i = 1; i <= 5; i++) {
      var temp = ($event.pageNumber * 5) + i;
      this.items.push({id: temp});
    }    
  }  
}
