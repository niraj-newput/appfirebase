import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
	@Input() post = {};
	constructor(public db: AngularFireDatabase) {

	}

	ngOnInit() {
		console.log(this.post);
		// this.db.database.ref('users').child(this.post.userId).on('value' , user => {
		// 	console.log(user.val().firstName);
		// })
	}

}
