import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { InicioPage } from '../inicio/inicio';

import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
 /**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;
  userProfile: any = null;

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, public usuarioProv: UsuarioProvider) {
  	firebase.auth().onAuthStateChanged( user => {
	    if (user){
	      this.userProfile = user;
	    } else { 
	      this.userProfile = null; 
	    }
	});
 


 
  }
  login() {
    this.googlePlus.login({
    	'webClientId': '218374975257-mf9b2e7bubbb1iugjgr6a7s387f69fjn.apps.googleusercontent.com',
    	'online': true
    }).then(res => {
        console.log(res);
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(user => {

        	this.usuarioProv.cargarUsuario(
        		user.displayName,
        		user.email,
        		user.photoURL,
        		user.uid,
        		'google'

        	);
        	

        	this.navCtrl.setRoot(InicioPage);
        })
        .catch(error => console.log('Firebase failure:'+ JSON.stringify(error)));

        
      })
      .catch(err => alert("Error"+err));
  }
  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
