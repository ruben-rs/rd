import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { leerDatosArray } from '../../providers/crud/crud';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
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
  items = [];

  isLoggedIn:boolean = false;
  isArray:boolean = false;
  isExiste:boolean = false;
  userProfile: any = null;

  Usersref = firebase.database().ref('usuarios/');
  db = firebase.database();

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, public usuarioProv: UsuarioProvider) {

          this.Usersref.on('value', resp =>{
            
            this.items= leerDatosArray(resp);

            if(this.items.length!=0){
              this.isArray = true;

            }
          });
  
 
  }
  validare(email){
    this.isExiste = false;

    this.Usersref.on('value', resp =>{
      this.items= leerDatosArray(resp);

      for (var i = 0; i < this.items.length; i++) {
        
        if (this.items[i].email==email) {
          this.isExiste = true;
        }
      }
      
    });

    return this.isExiste;

  }
  registrarse() {
    this.googlePlus.login({
    	'webClientId': '218374975257-mf9b2e7bubbb1iugjgr6a7s387f69fjn.apps.googleusercontent.com',
    	'online': true,
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

          if (this.isArray) {

            if (this.validare(user.email)) {
              alert('Ya hay un usuario registrado con el mismo correo')
            }else{
              console.log(this.Usersref.push().set({
                nombre: user.displayName,
                email: user.email
              }));
              alert('Usuario registrado')
            }
            

          }else{
            console.log(this.Usersref.push().set({
              nombre: user.displayName,
              email: user.email
            }));
            alert('Usuario registrado')
            this.isArray = true;
            
          }

        	// this.navCtrl.setRoot(InicioPage);
        })
        .catch(error => console.log('Firebase failure:'+ JSON.stringify(error)));

        
      })
      .catch(err => alert("Error"+err));
  }
  login() {
    this.googlePlus.login({
      'webClientId': '218374975257-mf9b2e7bubbb1iugjgr6a7s387f69fjn.apps.googleusercontent.com',
      'online': true,
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

          if (this.isArray) {

            if (this.validare(user.email)) {
              this.navCtrl.setRoot(InicioPage)
            }else{
              alert('No hay ningun usuario registrado con el correo '+ user.email +' registreseeee')
            }
            

          }else{
            alert('No hay ningun usuario registrado registrese')
          }
          

          // this.navCtrl.setRoot(InicioPage);
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
