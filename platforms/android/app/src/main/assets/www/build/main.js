webpackJsonp([2],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_crud_crud__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inicio_inicio__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, googlePlus, usuarioProv) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.googlePlus = googlePlus;
        this.usuarioProv = usuarioProv;
        this.items = [];
        this.isLoggedIn = false;
        this.isArray = false;
        this.isExiste = false;
        this.userProfile = null;
        this.Usersref = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('usuarios/');
        this.db = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]();
        this.Usersref.on('value', function (resp) {
            _this.items = Object(__WEBPACK_IMPORTED_MODULE_3__providers_crud_crud__["a" /* leerDatosArray */])(resp);
            if (_this.items.length != 0) {
                _this.isArray = true;
            }
        });
    }
    LoginPage.prototype.validare = function (email) {
        var _this = this;
        this.isExiste = false;
        this.Usersref.on('value', function (resp) {
            _this.items = Object(__WEBPACK_IMPORTED_MODULE_3__providers_crud_crud__["a" /* leerDatosArray */])(resp);
            for (var i = 0; i < _this.items.length; i++) {
                if (_this.items[i].email == email) {
                    _this.isExiste = true;
                }
            }
        });
        return this.isExiste;
    };
    LoginPage.prototype.registrarse = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '218374975257-mf9b2e7bubbb1iugjgr6a7s387f69fjn.apps.googleusercontent.com',
            'online': true,
        }).then(function (res) {
            console.log(res);
            __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(__WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider.credential(res.idToken)).then(function (user) {
                _this.usuarioProv.cargarUsuario(user.displayName, user.email, user.photoURL, user.uid, 'google');
                if (_this.isArray) {
                    if (_this.validare(user.email)) {
                        alert('Ya hay un usuario registrado con el mismo correo');
                    }
                    else {
                        console.log(_this.Usersref.push().set({
                            nombre: user.displayName,
                            email: user.email
                        }));
                        alert('Usuario registrado');
                    }
                }
                else {
                    console.log(_this.Usersref.push().set({
                        nombre: user.displayName,
                        email: user.email
                    }));
                    alert('Usuario registrado');
                    _this.isArray = true;
                }
                // this.navCtrl.setRoot(InicioPage);
            })
                .catch(function (error) { return console.log('Firebase failure:' + JSON.stringify(error)); });
        })
            .catch(function (err) { return alert("Error" + err); });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '218374975257-mf9b2e7bubbb1iugjgr6a7s387f69fjn.apps.googleusercontent.com',
            'online': true,
        }).then(function (res) {
            console.log(res);
            __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(__WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider.credential(res.idToken)).then(function (user) {
                _this.usuarioProv.cargarUsuario(user.displayName, user.email, user.photoURL, user.uid, 'google');
                if (_this.isArray) {
                    if (_this.validare(user.email)) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__inicio_inicio__["a" /* InicioPage */]);
                    }
                    else {
                        alert('No hay ningun usuario registrado con el correo ' + user.email + ' registreseeee');
                    }
                }
                else {
                    alert('No hay ningun usuario registrado registrese');
                }
                // this.navCtrl.setRoot(InicioPage);
            })
                .catch(function (error) { return console.log('Firebase failure:' + JSON.stringify(error)); });
        })
            .catch(function (err) { return alert("Error" + err); });
    };
    LoginPage.prototype.logout = function () {
        var _this = this;
        this.googlePlus.logout()
            .then(function (res) {
            console.log(res);
            _this.displayName = "";
            _this.email = "";
            _this.familyName = "";
            _this.givenName = "";
            _this.userId = "";
            _this.imageUrl = "";
            _this.isLoggedIn = false;
        })
            .catch(function (err) { return console.error(err); });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n\n  \n    <button expand="block" color="danger" ion-button full (click)="login()">\n    	<ion-icon name="logo-googleplus"> </ion-icon>   \n    	 Iniciar Sesión con Google\n    </button>\n    <button expand="block" color="primary" ion-button full (click)="registrarse()">\n      <ion-icon name="logo-googleplus"> </ion-icon>   \n       Registrarse con Google\n    </button>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InicioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InicioPage = /** @class */ (function () {
    function InicioPage(navCtrl, afAuth, navParams, usuarioProv, googlePlus, database) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.navParams = navParams;
        this.usuarioProv = usuarioProv;
        this.googlePlus = googlePlus;
        this.database = database;
        this.user = {};
        this.user = this.usuarioProv.usuario;
        this.afAuth.authState.subscribe(function (user) {
        });
    }
    InicioPage.prototype.salir = function () {
        var _this = this;
        this.googlePlus.logout()
            .then(function (res) {
            _this.usuarioProv.usuario = {};
        }).catch(function (err) { return console.error(err); });
        this.afAuth.auth.signOut().then(function (res) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        });
    };
    InicioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InicioPage');
    };
    InicioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-inicio',template:/*ion-inline-start:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/inicio/inicio.html"*/'<!--\n  Generated template for the InicioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Bienvenidoo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<ion-item text-center>\n		<img [src]="user.imagen">\n	</ion-item>\n	<button expand="block" color="primary" ion-button full (click)="salir()">\n    	<ion-icon name="logo-googleplus"> </ion-icon>   \n    	Salir Google\n    </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/inicio/inicio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["AngularFireDatabase"]])
    ], InicioPage);
    return InicioPage;
}());

//# sourceMappingURL=inicio.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/inicio/inicio.module": [
		804,
		1
	],
	"../pages/login/login.module": [
		805,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 254;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return leerDatosArray; });
var leerDatosArray = function (leerdatos) {
    var returnArray = [];
    leerdatos.forEach(function (element) {
        var item = element.val();
        item.key = element.key;
        returnArray.push(item);
    });
    return returnArray;
};
//# sourceMappingURL=crud.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(415);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_inicio_inicio__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_usuario_usuario__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var firebaseConfig = {
    apiKey: "AIzaSyD8K7lk63hBqnD_ZGhg_Fx9FqGFAg8zsKo",
    authDomain: "carasoft-418d6.firebaseapp.com",
    databaseURL: "https://carasoft-418d6.firebaseio.com",
    projectId: "carasoft-418d6",
    storageBucket: "carasoft-418d6.appspot.com",
    messagingSenderId: "218374975257"
};
__WEBPACK_IMPORTED_MODULE_13_firebase__["initializeApp"](firebaseConfig);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_inicio_inicio__["a" /* InicioPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/inicio/inicio.module#InicioPageModule', name: 'InicioPage', segment: 'inicio', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["AngularFireModule"].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["AngularFireAuthModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_inicio_inicio__["a" /* InicioPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_usuario_usuario__["a" /* UsuarioProvider */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, afAuth, navParams, usuarioProv, googlePlus, database) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.navParams = navParams;
        this.usuarioProv = usuarioProv;
        this.googlePlus = googlePlus;
        this.database = database;
        this.items = [];
        this.isLoggedIn = false;
        this.isArray = false;
        this.isExiste = false;
        this.user = {};
        this.Usersref = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"]().ref('usuarios/');
        this.db = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"]();
        this.Usersref.on('value', function (resp) {
            _this.items = Object(__WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__["a" /* leerDatosArray */])(resp);
            if (_this.items.length != 0) {
                _this.isArray = true;
            }
            console.log(_this.isArray);
        });
    }
    HomePage.prototype.enviar = function () {
        console.log(this.Usersref.push().set({
            nombre: 'ruben ruiz',
            email: 'rd@gmail.com'
        }));
        // console.log(this.db.list('usuarios'))
    };
    HomePage.prototype.enviar1 = function () {
        if (this.validare('ruben@gmail.com')) {
            alert('Ya hay un usuario registrado con el mismo correo');
        }
        else {
            console.log(this.Usersref.push().set({
                nombre: 'ruben ruiz',
                email: 'ruben@gmail.com'
            }));
            this.isArray = true;
        }
        // console.log(this.db.list('usuarios'))
    };
    HomePage.prototype.enviar2 = function () {
        if (this.validare('rd@gmail.com')) {
            alert('Ya hay un usuario registrado con el mismo correo');
        }
        else {
            console.log(this.Usersref.push().set({
                nombre: 'ruben ruiz',
                email: 'rd@gmail.com'
            }));
            this.isArray = true;
        }
        // console.log(this.db.list('usuarios'))
    };
    HomePage.prototype.enviar3 = function () {
        if (this.validare('rs@gmail.com')) {
            alert('Ya hay un usuario registrado con el mismo correo');
        }
        else {
            console.log(this.Usersref.push().set({
                nombre: 'ruben ruiz',
                email: 'rs@gmail.com'
            }));
            this.isArray = true;
        }
        // console.log(this.db.list('usuarios'))
    };
    HomePage.prototype.validare = function (email) {
        var _this = this;
        this.isExiste = false;
        this.Usersref.on('value', function (resp) {
            _this.items = Object(__WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__["a" /* leerDatosArray */])(resp);
            for (var i = 0; i < _this.items.length; i++) {
                if (_this.items[i].email == email) {
                    _this.isExiste = true;
                }
            }
        });
        return this.isExiste;
    };
    HomePage.prototype.rg = function () {
        if (this.isArray) {
            if (this.validare('rd@gmail.com')) {
                alert('Ya hay un usuario registrado con el mismo correo');
            }
            else {
                alert('Exito');
            }
        }
        else {
            console.log(this.Usersref.push().set({
                nombre: 'ruben ruiz',
                email: 'rs2@gmail.com'
            }));
            this.isArray = true;
        }
    };
    HomePage.prototype.is = function () {
        if (this.isArray) {
            if (this.validare('rd@gmail.com')) {
                alert('Exito');
            }
            else {
                alert('No hay ningun usuario registrado registreseee');
            }
        }
        else {
            alert('No hay ningun usuario registrado registrese');
        }
    };
    HomePage.prototype.validar = function () {
        var _this = this;
        //console.log(this.Usersref.push().set({nombre:'ruben ruiz'}));
        // console.log(this.db.list('usuarios'))
        this.Usersref.on('value', function (resp) {
            _this.items = Object(__WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__["a" /* leerDatosArray */])(resp);
            console.log(Object(__WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__["a" /* leerDatosArray */])(resp));
            if (Object(__WEBPACK_IMPORTED_MODULE_5__providers_crud_crud__["a" /* leerDatosArray */])(resp).length == 0) {
                console.log('vacio');
            }
            else {
                for (var i = 0; i < _this.items.length; i++) {
                    if (_this.items[i].email == "rd@gmail.com") {
                        console.log('existe');
                    }
                    else {
                        console.log('no existe');
                    }
                }
            }
        });
    };
    HomePage.prototype.login = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '1032833418605-4mecvv3to078q23jr4hiac00dv174p8u.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            console.log(res);
            _this.displayName = res.displayName;
            _this.email = res.email;
            _this.familyName = res.familyName;
            _this.givenName = res.givenName;
            _this.userId = res.userId;
            _this.imageUrl = res.imageUrl;
            _this.isLoggedIn = true;
            alert(res.displayName);
        })
            .catch(function (err) { return alert("Error" + err); });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.googlePlus.logout()
            .then(function (res) {
            console.log(res);
            _this.displayName = "";
            _this.email = "";
            _this.familyName = "";
            _this.givenName = "";
            _this.userId = "";
            _this.imageUrl = "";
            _this.isLoggedIn = false;
        })
            .catch(function (err) { return console.error(err); });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<button expand="block" color="primary" ion-button full (click)="enviar1()">\n	    Registrar 1\n	</button>\n	<button expand="block" color="primary" ion-button full (click)="enviar2()">\n	    Registrar 2\n	</button>\n	<button expand="block" color="primary" ion-button full (click)="enviar3()">\n	    Registrar 2\n	</button>\n	<button expand="block" color="primary" ion-button full (click)="is()">\n	    I SS\n	</button>\n	<button expand="block" color="primary" ion-button full (click)="rg()">\n	    R SS\n	</button>\n</ion-content>\n'/*ion-inline-end:"/Users/rubensanchezruiz/projects-ionic/Carasoftv2/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["AngularFireDatabase"]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider() {
        this.usuario = {};
    }
    UsuarioProvider.prototype.cargarUsuario = function (nombre, email, imagen, uid, provider) {
        this.usuario.nombre = nombre,
            this.usuario.email = email,
            this.usuario.imagen = imagen,
            this.usuario.uid = uid,
            this.usuario.provider = provider;
    };
    UsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UsuarioProvider);
    return UsuarioProvider;
}());

//# sourceMappingURL=usuario.js.map

/***/ })

},[410]);
//# sourceMappingURL=main.js.map