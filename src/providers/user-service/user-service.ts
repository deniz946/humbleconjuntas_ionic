import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class UserServiceProvider {

  	private API:string = 'http://localhost:3000/';
  	private users:any;

  	constructor(public http: Http) {
  		console.log('Hello UserServiceProvider Provider');
  	}

  	getPackUsers(packId){
  		return this.http.get(this.API + 'users/' + packId)
  		.map(res => res.json())
  		.toPromise()
  	}

  	reactivate(user, packId){

		return this.http.post(this.API + 'users/confirm/' + user.username + '/' + packId, { paid: false })
		.map(res => res.json())
		.toPromise();
  	}

  	sendIndividualMail(email, packId){
		return this.http.post(this.API + 'users', { user: {email: email}, pack: packId })
		.map(res => res.json())
		.toPromise();
  	}



  }
