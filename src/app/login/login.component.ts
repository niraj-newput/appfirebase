import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray , FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../index.css','./login.component.css']
})
export class LoginComponent implements OnInit {
	errorFlag: boolean = false;
	loginForm = new FormGroup({
	    email: new FormControl('', Validators.required),
	    password: new FormControl('', Validators.required)
	});

	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router, public auth: AuthService) { }

	ngOnInit() {

	}

	onSubmit(value) {
		// let self = this;
		// this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then((res) => {
		// 	console.log(res);
		// 	console.log(self.afAuth.auth.currentUser);
		// }, (error) => {
		// 	alert('error')
		// })
		// let user = this.auth.login(value).then(user => {
		// 	console.log(user.val());
		// });
		this.db.database.ref('users').orderByChild('email').equalTo(value.email).once('value', function(user) {
			let userc = user.val();
			console.log(userc);
		});
		this.db.database.ref('users').once('value', snap => {
			let obj = snap.val();
			for (var key in obj) {
				if(obj[key].email == value.email && obj[key].password == value.password) {

					value['_id'] = key;
					console.log(value)
					localStorage.setItem('currentUser', JSON.stringify(value));
					this.router.navigate(['/main']);
				}else {
					this.errorFlag = true;
				}
			}
		});
	}
}
