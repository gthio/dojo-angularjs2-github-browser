import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Github {
	constructor(private http: Http) {}

  searchUsers(searchFor: string,
    perPage: string = '10'){
      if (searchFor != null &&
        searchFor.length > 0){
          return this.makeSearchRequest('users',
            searchFor,
            perPage);  
      } 
      else {
        return this.getUsers(perPage);      
      }
  }

	getUsers(perPage: string = '10'){
		return this.makeRequest(`users`,
      perPage);
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

	private makeRequest(path: string,
    perPage: string = '10'){
      
      let params = new URLSearchParams();
      params.set('per_page', perPage);

      let url = `https://api.github.com/${ path }`;
      return this.http.get(url, {search: params})
        .map((res) => res.json());
	}
  
	private makeSearchRequest(path: string,
    searchFor: string,
    perPage: string = '10'){
      
      let params = new URLSearchParams();
      params.set('q', searchFor);
      params.set('per_page', perPage);
      
      let url = `https://api.github.com/search/${ path }`;
      
      return this.http.get(url, {search: params})
        .map((res) => res.json().items);
	}  
}
