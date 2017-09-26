import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder,  FormGroup, Validators} from '@angular/forms';
import { PackServiceProvider } from '../../providers/pack-service/pack-service';

/**
 * Generated class for the NewPackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-new-pack',
 	templateUrl: 'new-pack.html',
 })

 export class NewPackPage {

 	myForm: FormGroup;
 	pack: any;
 	method: string;

 	constructor(public navCtrl: NavController, 
 		public navParams: NavParams, 
 		public viewCtrl: ViewController, 
 		public formBuilder: FormBuilder,
 		private alertCtrl: AlertController,
 		private packService: PackServiceProvider) {

 		this.pack = navParams.get('pack') || {};
 		this.method = 'post';
 		this.myForm = this.createForm();
 	}

 	private createForm(){
 		return this.formBuilder.group({
 			name: [this.pack.name || '', Validators.required],
 			link: [this.pack.link || '', Validators.required],
 			email_title: [this.pack.email_title || '', Validators.required],
 		})
 	}

 	saveForm(){
 		let formData = this.myForm.value;
 		if(this.pack._id) formData._id = this.pack._id;
 		this.packService.newPack(formData)
 		.then(res => {
 			if(res.err) this.showAlert('Error', res.msg);
 			else {
 				this.showAlert('OK', res.msg);
 				this.viewCtrl.dismiss();
 			}

 		})

 	}

 	showAlert(title: string, msg: string) {
 		let alert = this.alertCtrl.create({
 			title: title || 'Aviso!',
 			subTitle: msg || 'La acción se ha realizado correctamente',
 			buttons: ['OK']
 		});
 		alert.present();
 	}


 dismiss() {
 	this.viewCtrl.dismiss();
 }

}
