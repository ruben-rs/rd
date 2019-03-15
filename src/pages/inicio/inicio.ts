import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';
import { GooglePlus } from '@ionic-native/google-plus';


import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

	user: Credenciales = {};

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public navParams: NavParams, public usuarioProv: UsuarioProvider, private googlePlus: GooglePlus) {

  	this.user = this.usuarioProv.usuario;
  	this.afAuth.authState.subscribe(user => {

  	});

  }
  salir(){

  	this.googlePlus.logout()
      .then(res => {
        this.usuarioProv.usuario = {};
    }).catch(err => console.error(err));

  	this.afAuth.auth.signOut().then(res => {
  		this.navCtrl.setRoot(LoginPage);
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
