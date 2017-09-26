import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {

  public users: any;

  constructor(public http: Http) {
  }

  load() {
  		if (this.users) {
  			// already loaded users
  			return Promise.resolve(this.users);
  		}

  		// don't have the users yet
  		return new Promise(resolve => {
  			this.http.get('../../assets/restaurants/users.json')
  			.map(res => res.json())
  			.subscribe(users => {
  				this.users = users.results;
  				resolve(this.users);
  			});
  		});
  	}

}
