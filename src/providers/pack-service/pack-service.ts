import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the PackServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class PackServiceProvider {

  	private API:string = 'http://localhost:3000/';
  	private packs:any;
  	private method:string;
  	constructor(public http: Http) {
  		this.method = 'post';
  	}

  	get(){
  		
  		return new Promise(resolve => {
  			this.http.get(this.API + 'pack')
  			// this.http.get('../../assets/restaurants/packs.json')
  			.map(res => res.json())
  			.subscribe(response =>{
  				this.packs = response;
  				resolve(this.packs);
  			})
  		})
  	}

  	confirmUser(user, packId){
  		return this.http.post(this.API + 'users/confirm/' + user.username + '/' + packId, { paid: true })
  		.map(res => res.json())
  		.toPromise()
  	}

  	sendMail(user, packId){
  		return this.http.post(this.API + 'users', { user: user, pack: packId })
  		.map(res => res.json())
  		.toPromise()
  	}

  	newPack(pack){
  		
  		let params = {
  			name: pack.name,
  			link: pack.link,
  			email_title: pack.email_title,
  			id: pack._id || null
  		};

  		if(pack._id) this.method = 'put';
  		else this.method = 'post';

  		return this.http[this.method](this.API + 'pack', params)
  		.map(res => res.json())
  		.toPromise();
  	}

  	deletePack(packId){

		return this.http.delete(this.API + 'pack' + '/' + packId)
		.map(res => res.json())
		.toPromise();
  	}

  }
