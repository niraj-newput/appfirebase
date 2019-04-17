import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray , FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../index.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
	regForm = new FormGroup({
		firstName: new FormControl(''), 
	    email: new FormControl(''),
	    password: new FormControl('')
	});
	constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) { }

	ngOnInit() {
	}

	onSubmit(value) {
		this.afAuth.auth.createUserWithEmailAndPassword(value.email,value.password).then((res) => { 
			console.log('successfully');
		}, (error) => {
			console.log(error);
			});
		this.db.database.ref('users').push(value);
		 this.router.navigate(['/login']);
	}
}
