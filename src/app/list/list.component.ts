import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray , FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import { PostService } from '../post.service';

import { map } from 'rxjs/operators';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	editModalOpen : string = 'none';
	postEdit = {};
	storageRef: any;
	postList: any[];
	imgList : any[];
	imgObj: any = {};
	postImage: any = {};
	currentUser: any ;
	public title = 'user dgdf';
	postForm = new FormGroup({
	    postDesc: new FormControl(''),
	    img: new FormControl(''),
	    userId: new FormControl(''),
	    firstName : new FormControl('')
	});
	postEditForm = new FormGroup({
	    postDesc: new FormControl(''),
	    postId: new FormControl('')
	});
	constructor(public db: AngularFireDatabase, public storage: AngularFireStorage, private postService : PostService) {
		let self = this;
		this.storageRef = storage.storage.ref();
		// db.database.ref('post').limitToFirst(3).on('value', post => {
		// 		this.postList = post.val();
		// 		console.log(post.val());
		// 		this.postList = Object.values(post.val());
		// });
		postService.getAllPost().subscribe(post => {
	  		this.postList = post;
	  		console.log(this.postList);
	  	});
	  	db.list('/images').valueChanges().subscribe(img => {
	  		this.imgList = img;
	  		console.log(this.imgList);
	  	});
	  	db.database.ref('images').once('value', function(imgs) {
			var obj = imgs.val();
			Object.entries(obj).forEach(entry => {
			  let key = entry[0];
			  let value = entry[1];
			});
		});
	  }
	ngOnInit() {
		let self = this;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser);
		this.db.database.ref('users/' + this.currentUser._id).once('value', snap => {
		});
		
		this.db.database.ref('images').on('value', function(images) {
	  		self.imgObj = images.val();
	  	});
	  	this.postForm.patchValue({
	  		userId: self.currentUser._id
	  	});
	}

	savePost(value) {
		if( Object.keys(this.postImage).length != 0) {
			value['postImageUrl'] = this.postImage.url;
			value['imageName'] = this.postImage.imgName;
		}else {
			value['postImageUrl'] = '';
			value['imageName'] = '';
		}
		this.postService.createPost(value).then(res => {
	  		
	  	}, (error) => {
	  		
	  	});
		this.postForm.patchValue({
			postDesc: ''
		});
	}

	selectImage(event) {
		let self = this;
		
		let file = event.target.files[0];
		let fileName = event.target.files[0].name;

		let task = this.storageRef.child('postImages/' + fileName).put(file).then(function(data) {
			console.log(data.task)
			self.storage.ref('postImages').child(data.task.blob_.data_.name).getDownloadURL().subscribe(url => {
				 self.postImage = {
					'imgName': fileName,
					'url': url
				};
			});
		});
	}

	removePhoto(imgName) {
		let self = this;
		alert(1);
		this.storageRef.child('images/'+imgName).delete().then((success) => {
			alert('success')
			

			self.db.database.ref('images').orderByChild('imgName').equalTo(imgName).once('value', function(image) {
				let keys = Object.keys(image.val());
				let key = keys[0];
				self.db.database.ref('images').child(key).remove().then(() => {
					alert('success image')
				});
			});
		}, (error) => {
			alert('error')
		});
	}

	public getUserName(id) {
		this.db.database.ref('users').child(id).on('value' , user => {
			return user.val().firstName;
		})
	}

	openModal(postId) {
		this.editModalOpen = 'block';
		let self = this;
		this.db.database.ref('post').child(postId).on('value' , postEdit => {
			console.log(postEdit.val());
			this.postEdit = postEdit.val();
				self.postEditForm.patchValue({
		  		postId: postEdit.val()._id,
		  		postDesc :  postEdit.val().postDesc
		  	});
		})
	}

	updatePost(editPost) {
		this.postService.updatePost(editPost).then(res => {
	  		alert('update successfully');
	  		this.closeModal();
	  	}, (error) => {
	  		alert('Error')
	  	});
	}

	closeModal() {
		this.editModalOpen = 'none';
	}
}
