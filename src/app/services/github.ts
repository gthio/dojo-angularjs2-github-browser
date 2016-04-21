import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class Github {
	constructor(private http: Http) {}

  searchUsers(searchFor: string) : Observable<any[]>{
    if (searchFor != null &&
      searchFor.length > 0){
        return this.makeSearchRequest('users',
          searchFor);  
    } 
    else {
      return this.getUsers();      
    }
  }

	getUsers(){
		return this.makeRequest(`users`);
	}

	getUser(user:string){
		return this.makeRequest(`users/${user}`);
	}

	getOrg(org:string){
		return this.makeRequest(`orgs/${org}`);
	}

	getReposForOrg(org:string){
		return this.makeRequest(`orgs/${org}/repos`);
	}

	getRepoForOrg(org:string, repo:string){
		return this.makeRequest(`repos/${org}/${repo}`);
	}
  
  getReposForUser(user: string){
    return this.makeRequest(`users/${user}/repos`);
  }

	private makeRequest(path: string){
		let params = new URLSearchParams();
		params.set('per_page', '5');

		let url = `https://api.github.com/${ path }`;
		return this.http.get(url, {search: params})
			.map((res) => res.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);      
	}
  
	private makeSearchRequest(path: string,
    searchFor: string){
      
      let params = new URLSearchParams();
      params.set('q', searchFor);
		  params.set('per_page', '5');
          
      let url = `https://api.github.com/search/${ path }`;
      
      return this.http.get(url, {search: params})
        .map((res) => res.json().items)
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
	}  
  
  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
