import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	sidebarToggle: boolean = false;
	courses: any[];
	constructor(public db: AngularFireDatabase,  public router: Router) {
		db.list('/courses').valueChanges().subscribe(course => {
			this.courses = course;
		});
	}

	ngOnInit() {
		
	}
	logout() {
		localStorage.removeItem('currentUser');
		this.router.navigate(['/login']);
	}
	toggleSidebar() {
		this.sidebarToggle = !this.sidebarToggle;
	}
}
