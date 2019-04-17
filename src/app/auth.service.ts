import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(public db: AngularFireDatabase) { 
	}

	login(obj): any  {
		// this.db.database.ref('users').orderByChild('email').equalTo(obj.email).once('value', function(user) {
		// 	console.log(user.toJSON())	
		// 	return user;
		// });
		return this.db.database.ref('users').orderByChild('email').equalTo(obj.email).once('value');
	}
}
