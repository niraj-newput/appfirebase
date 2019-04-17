import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  getAllPost() {
  	return this.db.list('/post').valueChanges();
  }

  createPost(value) {
  	let key = this.db.database.ref('post').push().key;
  	value['_id']= key;
  	return this.db.database.ref('post').child(key).set(value);
  }

  removePost(id) {
  	let self = this;
  	this.getPostById(id).then((res)=> {
  		console.log('get post id');
  		console.log(self.storageRef)
  		let post = res.val();
  		console.log('postImages/'+post.imageName);
  		self.storage.storage.ref().child('postImages/'+post.imageName).delete().then((success) => {
			alert('remove post image success')
			return self.db.database.ref('post').child(id).remove();
		}, (error) => {
			alert('error');
			return self.db.database.ref('post').child(id).remove();
		});
  	}, (error) => {

  	});
  	
  }

  updatePost(value) {
  	return this.db.database.ref('post').child(value.postId).update(value);
  }

  getPostById(id) {
  	return this.db.database.ref('post').child(id).once('value');
  }

}
