import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Github {
	constructor(private http: Http) {}

  searchUsers(searchFor: string){
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
		params.set('per_page', '100');

		let url = `https://api.github.com/${ path }`;
		return this.http.get(url, {search: params})
			.map((res) => res.json());
	}
  
	private makeSearchRequest(path: string,
    searchFor: string){
      
      let params = new URLSearchParams();
      params.set('q', searchFor);
      
      let url = `https://api.github.com/search/${ path }`;
      
      return this.http.get(url, {search: params})
        .map((res) => res.json().items);
	}  
}
