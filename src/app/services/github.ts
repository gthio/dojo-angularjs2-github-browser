import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams, Response} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class Github {
	constructor(private http: Http) {}

  searchUsers(searchFor: string,
    page: string = '1',
    perPage: string = '100'){
      if (searchFor != null &&
        searchFor.length > 0){
          
          var x: Map<string, string> = new Map<string, string>();
            x.set("location", "Singapore");
            //x.set("language", "Javascript");
          
          return this.makeSearchRequest('users',
            searchFor,
            page,
            perPage,
            x);  
      } 
      else {
        return this.getUsers(page,
          perPage);      
      }
  }

	getUsers(page: string = '1',
    perPage: string = '100'){
		  return this.makeRequest(`users`,
        page,
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
    page: string = '1',
    perPage: string = '100'){
      
      let params = new URLSearchParams();
      //params.set('page', page);
      params.set('per_page', (+page * +perPage).toString());

      let url = `https://api.github.com/${ path }`;
      
      return this.http.get(url, {search: params})
        .map((res) => res.json())
        //.do(data => {console.log('All: ' + JSON.stringify(data))})
        .catch(this.handleError);
	}
  
	private makeSearchRequest(path: string,
    searchFor: string,
    page: string = '1',
    perPage: string = '100',
    parameters: Map<string, string>){
      
      let test = searchFor + '+location:' + parameters.get('location');
      
      parameters.forEach(function (value, key) {
        params.set(key.toString(), value.toString());
      })
      
      //let params = new URLSearchParams();
      //params.set('q', searchFor);
      //params.set('page', page);
      //params.set('per_page', perPage);
      
      let params = new URLSearchParams();
      params.set('q', test)
      
      let url = `https://api.github.com/search/${ path }`;
      
      return this.http.get(url, {search: params})
        .map((res) => res.json().items)
        .do(data => {console.log('All: ' + JSON.stringify(data))})
        .catch(this.handleError);
	}  
  
  private handleError(error: Response){
    console.log(error);
    return Observable.throw(error.json().error ||
      'Server Error');
  }
}
