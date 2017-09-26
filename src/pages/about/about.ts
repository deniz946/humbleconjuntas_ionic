import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';
import { PackServiceProvider } from '../../providers/pack-service/pack-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	public pack: any;
	public users:any;
	public aux_users: any;
	public pagos: string;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public actionSheet: ActionSheetController,
		private clipboard: Clipboard,
		private packService: PackServiceProvider,
		private toasterCtrl: ToastController,
		private userService: UserServiceProvider,
		private alertCtrl: AlertController) {

		this.pack = navParams.get("pack");
		this.users = [];
		this.aux_users = [];
		this.pagos = 'paid';
		this.getUsers();
	}

	getUsers(){
		this.userService.getPackUsers(this.pack._id)
		.then(users => {
			this.users = users;
			this.aux_users = users;
		})
	}

	getItems(ev: any) {
		// Reset items back to all of the items
		this.aux_users = [...this.users]

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.aux_users = this.aux_users.filter((item) => {
				return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	options() {
		let actionSheet = this.actionSheet.create({
			title: 'Opciones',
			buttons: [
			{
				text: 'Listado de conjuntas',
				icon: 'list',
				handler: () => {
					this.navCtrl.pop();
				}
			},{
				text: 'Exportar usuarios',
				icon: 'download',
				handler: () => {
					this.clipboard.copy('Hello world');
					this.clipboard.paste().then(
						(resolve: string) => {
							alert(resolve);
						},
						(reject: string) => {
							alert('Error: ' + reject);
						}
						);
					this.presentToast("Usuarios copiados al portapapeles");

				}
			},{
				text: 'Enviar email unitario',
				icon: 'mail',
				handler: () => {
					this.sendOneEmail()
				}
			}
			]
		});
		actionSheet.present();
	}

	presentToast(text) {
		let toast = this.toasterCtrl.create({
			message: text,
			duration: 1500
		});
		toast.present();
	}

	confirmUser(user){
		this.packService.confirmUser(user, this.pack._id)
		.then((response:any) => {
			if(response.err) this.presentToast(response.msg)
				this.packService.sendMail(user, this.pack._id)
			.then((done:any) => {
				if(!done.err){
					this.presentToast(done.msg);
					this.getUsers();
				}
			})
		})

	}

	sendOneEmail() {
		let prompt = this.alertCtrl.create({
			title: 'Enviar correo unitario',
			message: "Email del destinatario",
			inputs: [
			{
				name: 'email',
				placeholder: 'email@codigodiario.me'
			},
			],
			buttons: [
			{
				text: 'Cerrar',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Enviar',
				handler: data => {
					let email = data.email;
					this.userService.sendIndividualMail(email, this.pack._id)
					.then(res => {
						this.presentToast(res.msg)
					})
				}
			}
			]
		});
		prompt.present();
	}

	reactivateUser(user){
		this.userService.reactivate(user, this.pack._id)
		.then(res => {
			this.presentToast(res.msg);
			this.getUsers();
		})
	}

}
