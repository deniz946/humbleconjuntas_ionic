import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestaurantServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class RestaurantServiceProvider {


  	constructor(public http: Http, public users: any[]) {
  		console.log('Hello RestaurantServiceProvider Provider');
  	}

  	load() {
  		if (this.users) {
  			// already loaded users
  			return Promise.resolve(this.users);
  		}

  		// don't have the users yet
  		return new Promise(resolve => {
  			// We're using Angular HTTP provider to request the users,
  			// then on the response, it'll map the JSON users to a parsed JS object.
  			// Next, we process the users and resolve the promise with the new users.
  			this.http.get('https://randomuser.me/api/?results=10')
  			.map(res => res.json())
  			.subscribe(users => {
  				// we've got back the raw users, now generate the core schedule users
  				// and save the users for later reference
  				this.users = users.results;
  				resolve(this.users);
  			});
  		});
  	}

  }
