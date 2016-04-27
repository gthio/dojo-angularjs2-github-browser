import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams, Response} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class Github {
	constructor(private http: Http) {}

  searchUsers(searchFor: string,
    page: string = '1',
    perPage: string = '100',
    location: string = '',
    language: string = '',
    repoCount: number = 1,
    followerCount: number = 1){
      
    var searchParameters: Map<string, any> = new Map<string, any>();
    searchParameters.set("location", location);
    searchParameters.set("language", language);
    searchParameters.set("repos", repoCount);
    searchParameters.set("followers", followerCount);
          
    return this.makeSearchRequest('users',
      searchFor,
      page,
      perPage,
      searchParameters);  
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
  
  getLocations(){
    return ['Singapore', 'Australia'];
  }
  
  getLAnguages(){
    return ['Javascript', 'Ruby'];
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
        .do(data => {console.log('All: ' + JSON.stringify(data))})
        .catch(this.handleError);
	}
  
	private makeSearchRequest(path: string,
    searchFor: string,
    page: string,
    perPage: string,
    parameters: Map<string, any>){
            
      let searchCriteria = this.flattenMap(parameters, 
        '+',
        true);
        
      console.log(searchCriteria);   
        
      let params = new URLSearchParams();

      params.set('q', searchFor + '+' + searchCriteria);
      params.set('page', page);
      params.set('per_page', perPage);
      
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
  
  private flattenMap(data: Map<string, any>,
    delimiter: string,
    isIgnoreEmptyValue: boolean){
    
      var holder = new Array();
      data.forEach(function (value, key){      
        
        if (typeof(value) == 'string'){
          if (value.length > 0 ||
            (value.length == 0 && !isIgnoreEmptyValue)){
              holder.push(key + ':' + value + delimiter);    
          }
        }  
        else if (typeof(value) == 'number'){
          holder.push(key + ':>' + value + delimiter);
        }      
      });
    
      var text = holder.join("");
      
      return text.substr(0, text.length - 1);
  }
}
