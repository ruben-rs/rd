import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



import { leerDatosArray } from '../../providers/crud/crud';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
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

  user: Credenciales = {};
  UsersRef: AngularFireList<any>;
  Users: Observable<any[]>;

  Usersref = firebase.database().ref('usuarios/');
  db = firebase.database();


  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public navParams: NavParams, public usuarioProv: UsuarioProvider, private googlePlus: GooglePlus, public database: AngularFireDatabase) {

    this.Usersref.on('value', resp =>{
            
            this.items= leerDatosArray(resp);

            if(this.items.length!=0){
              this.isArray = true;

            }
            console.log(this.isArray)
          });


    
  }

  enviar(){

    console.log(this.Usersref.push().set({
      nombre:'ruben ruiz',
      email:'rd@gmail.com'
    }));
    // console.log(this.db.list('usuarios'))
    

  }
  enviar1(){
    if (this.validare('ruben@gmail.com')) {
      alert('Ya hay un usuario registrado con el mismo correo')
    }else{
      console.log(this.Usersref.push().set({
        nombre:'ruben ruiz',
        email:'ruben@gmail.com'
      }));
      this.isArray = true;
    }
    // console.log(this.db.list('usuarios'))
    

  }
  enviar2(){

    if (this.validare('rd@gmail.com')) {
      alert('Ya hay un usuario registrado con el mismo correo')
    }else{
      console.log(this.Usersref.push().set({
        nombre:'ruben ruiz',
        email:'rd@gmail.com'
      }));
      this.isArray = true;
    }
    // console.log(this.db.list('usuarios'))
    

  }
  enviar3(){

    if (this.validare('rs@gmail.com')) {
      alert('Ya hay un usuario registrado con el mismo correo')
    }else{
      console.log(this.Usersref.push().set({
        nombre:'ruben ruiz',
        email:'rs@gmail.com'
      }));
      this.isArray = true;
    }
    // console.log(this.db.list('usuarios'))
    

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
  rg(){

    if (this.isArray) {

      if (this.validare('rd@gmail.com')) {
        alert('Ya hay un usuario registrado con el mismo correo')
      }else{
        alert('Exito')
      }
      

    }else{
      console.log(this.Usersref.push().set({
        nombre:'ruben ruiz',
        email:'rs2@gmail.com'
      }));
      this.isArray = true;
      
    }
  }
  is(){

    if (this.isArray) {

      if (this.validare('rd@gmail.com')) {
        alert('Exito')
      }else{
        alert('No hay ningun usuario registrado registreseee')
      }
      

    }else{
      alert('No hay ningun usuario registrado registrese')
    }
  }

  validar(){

    //console.log(this.Usersref.push().set({nombre:'ruben ruiz'}));
    // console.log(this.db.list('usuarios'))
    this.Usersref.on('value', resp =>{
      this.items= leerDatosArray(resp);
      console.log(leerDatosArray(resp));

      if(leerDatosArray(resp).length==0){
        console.log('vacio')
      }else{

        for (var i = 0; i < this.items.length; i++) {
          
          if (this.items[i].email=="rd@gmail.com") {
            console.log('existe')
          }else{
            console.log('no existe')
          }
        }
      }
    });

  }


  login() {
    this.googlePlus.login({
    	'webClientId': '1032833418605-4mecvv3to078q23jr4hiac00dv174p8u.apps.googleusercontent.com',
    	'offline': true
    }).then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;

        alert(res.displayName)
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


}
