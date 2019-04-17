import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray , FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , AfterViewInit{
	imgUrl = '';
	storageRef: any;
	currentUser: any;
	public title = 'Tour of Heroes';
	updateForm = new FormGroup({
		address: new FormControl(''), 
	    perAddress: new FormControl(''),
	    city: new FormControl(''),
	    state: new FormControl(''),
	    zip: new FormControl(''),
	    companyName: new FormControl('')
	});
	constructor(public db: AngularFireDatabase, public storage : AngularFireStorage) {
		this.storageRef = storage.storage.ref();
		this.getCurrentUser();
		this.updateForm.patchValue(this.currentUser);
	}

	ngOnInit() {
		console.log(this.storageRef.child('images'));
		this.getCurrentUser();
	}

	getCurrentUser() {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser)
	}

	updateCurrentuser(user) {
		localStorage.setItem('currentUser', JSON.stringify(user));
		this.getCurrentUser();
	}

	ngAfterViewInit() {

	}
	onSubmit(value) {
		console.log(value);
		this.currentUser = { ...this.currentUser, ...value };
		this.updateCurrentuser(this.currentUser);
		this.db.database.ref('users').child(this.currentUser._id).update(this.currentUser);
		this.getCurrentUser();
	}

	uploadImg(event) {
		let self = this;
		alert(1);
		let file = event.target.files[0];
		let fileName = event.target.files[0].name;

		let task = this.storageRef.child('images/' + fileName).put(file).then(function(data) {
			console.log(data.task)
			self.storage.ref('images').child(data.task.blob_.data_.name).getDownloadURL().subscribe(url => {
				self.currentUser['imageName'] = fileName;
				self.currentUser['imageUrl'] = url;
				let imgObj = {
					'imgName': fileName,
					'url': url
				};
				self.updateCurrentuser(self.currentUser);
				self.db.database.ref('users').child(self.currentUser._id).update(self.currentUser);
				self.db.database.ref('images').push(imgObj);
			});
		});
		
		
	}

}
