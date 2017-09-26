import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { NewPackPage } from '../new-pack/new-pack';

// Providers
import {PeopleServiceProvider} from '../../providers/people-service/people-service';
import { PackServiceProvider } from '../../providers/pack-service/pack-service';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {

	public packs: any;

	constructor(public navCtrl: NavController, 
		public peopleService: PeopleServiceProvider, 
		public modalCtrl: ModalController,
		private actionSheetCtrl: ActionSheetController,
		private alertCtrl: AlertController,
		public packService: PackServiceProvider) {
		// this.loadPeople();
		this.loadPacks();
	}

	public people: any;
	aboutPage = AboutPage

	loadPacks(){
		this.packService.get()
		.then(packs =>{
			this.packs = packs;
			console.log(this.packs)
		})
	}

	loadPeople(){
		this.peopleService.load()
		.then(data => {
			this.people = data;
		})
	}

	navigate(pack) {
		this.navCtrl.push(AboutPage, {
			pack: pack,
		});
	}

	userOptions(pack) {
		let actionSheet = this.actionSheetCtrl.create({
			title: pack.name,
			buttons: [
			{
				text: 'Editar',
				icon: 'construct',
				handler: () => {
					this.presentModal(pack)
				}
			},{
				text: 'Eliminar',
				icon: 'trash',
				handler: () => {
					let callback = () => {
						this.packService.deletePack(pack._id)
						.then((res)=> {
							this.loadPacks();
						})
					}

					this.askDeletion(pack, callback);
				}
			},{
				text: 'Cancelar',
				icon: 'exit',
				role: 'cancel',
				handler: () => {
				}
			}
			]
		});
		actionSheet.present();
	}


	presentModal(pack?:any) {
		let modal = this.modalCtrl.create(NewPackPage, {pack:pack});
		modal.onDidDismiss(() => {
			this.loadPacks();
		});
		modal.present();
	}

	askDeletion(pack, callback) {
		let prompt = this.alertCtrl.create({
			title: 'Eliminar ' + pack.name,
			message: "¿Estás seguro de querer eliminar esta conjunta?",
			buttons: [
			{
				text: 'Cancelar',
				handler: () => {
					console.log('Disagree clicked');
				}
			},
			{
				text: 'Eliminar',
				handler: () => {
					console.log('Agree clicked');
					callback()
				}
			}
			]
		});
		prompt.present();
	}


}
