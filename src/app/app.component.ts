import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormGroup,FormBuilder, FormArray , FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl('')
  });
  courses: any[];
  constructor(public db: AngularFireDatabase,  public router: Router) {
  	db.list('/courses').valueChanges().subscribe(course => {
  		this.courses = course;
  	});
  }

  onSubmit(form) {
    this.db.database.ref('courses').push(form)
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  
}
