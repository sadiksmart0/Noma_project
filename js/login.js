
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
 	  var user = firebase.auth().currentUser;

 if (user != null) {
   // User is signed in.
 	window.location.replace = "./mainfeed.html";
	 
 } else {
   // No user is signed in.
 	window.alert("please signin with email and password");
 }

   } else {
     // No user is signed in.
	 window.location.replace = "./index.html"
   }
 });






 function login(){
	
    
    var userEmail = document.getElementById("email_field").value;
     var userPass = document.getElementById("password_field").value;
	
	
     
   firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
	  window.location.replace('./mainfeed.html'); 
   }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
  
    window.alert("Error : " + errorMessage);
 });
     
 }



 function signOut(){
 	firebase.auth().signOut().then(function() {
   // Sign-out successful.
	window.location.replace('./index.html'); 	
 }).catch(function(error) {
   // An error happened.
 });
 }



//function imageUpload(){
//	var image = document.getElementById("profpic").files[0];
//	var imageName = image.name;
//	
//	//firebase ref
//	var storageRef = firebase.storage().ref('profilepics/'+imageName);
//	
//	var uploadTask = storageRef.put(image);
//	
//	uploadTask.on('state_changed', function(snapshot){
//		var progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
//		console.log("upload"+progress+"done");
//				  },
//	 function(error){
//		console.log(error.message);
//	}, 
//				 function(){
//		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
//			return downloadURL;
//		});
//	});
//	
//	
//}

var database = firebase.database();
//individual data

function writeUserData(userId, name, email, password, state, imageUrl) {
	
	var userEmail = document.getElementById("email").value;
	var userPass = document.getElementById("password").value;
	 	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function(){
			var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
	
}).catch(function(error) {
  var errorCode = error.code;
   var errorMessage = error.message;
   // ...
		
 		window.alert("Error: "+errorMessage);

});
		}).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // ...
		
 		window.alert("Error: "+errorMessage);
 });
	
	
	
var image = document.getElementById("profpic").files[0];
	var imageName = image.name;
	
	//firebase ref
	var storageRef = firebase.storage().ref('profilepics/'+imageName);
	
	var uploadTask = storageRef.put(image);
	
	uploadTask.on('state_changed', function(snapshot){
		var progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
		console.log("upload"+progress+"done");
				  },
	 function(error){
		console.log(error.message);
	}, 
				 function(){
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
		 database.ref('users/'+userId).push({
	   userName: document.getElementById("userName").value,
    email: document.getElementById("email").value,
	password: document.getElementById("password").value,
	state: document.getElementById("state").value,
	profile_picture: downloadURL
	
	 
  });
	window.alert("signup successful");
		});
	});
		
}

//company's data


function writec_UserData(userId, name, email, password, state, imageUrl, url,cac, address) {
	
	
	var userEmail = document.getElementById("email").value;
	var userPass = document.getElementById("password").value;
	 	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // ...
		
 		window.alert("Error: "+errorMessage);
 });
	
	var image = document.getElementById("profpic").files[0];
	var imageName = image.name;
	
	//firebase ref
	var storageRef = firebase.storage().ref('profilepics/'+imageName);
	
	var uploadTask = storageRef.put(image);
	
	uploadTask.on('state_changed', function(snapshot){
		var progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
		console.log("upload"+progress+"done");
				  },
	 function(error){
		console.log(error.message);
	}, 
				 function(){
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
	database.ref('users/'+ userId).push({
	userName: document.getElementById("userName").value,
    email: document.getElementById("email").value,
	password: document.getElementById("password").value,
	state: document.getElementById("state").value,
	url: document.getElementById("url").value,
	cac: document.getElementById("cac").value,
	address: document.getElementById("address").value,
    profile_picture: downloadURL
  });
			
		});
	});
	
		
  
}

//transporter data
function writet_UserData(userId, name, email, password, state, imageUrl, phone, plate) {
	
	var userEmail = document.getElementById("email").value;
	var userPass = document.getElementById("password").value;
	 	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // ...
		
 		window.alert("Error: "+errorMessage);
 });
	
	var image = document.getElementById("profpic").files[0];
	var imageName = image.name;
	
	//firebase ref
	var storageRef = firebase.storage().ref('profilepics/'+imageName);
	
	var uploadTask = storageRef.put(image);
	
	uploadTask.on('state_changed', function(snapshot){
		var progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
		console.log("upload"+progress+"done");
				  },
	 function(error){
		console.log(error.message);
	}, 
	function(){
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
			
	
  database.ref('users/'+ userId).push({
	   userName: document.getElementById("userName").value,
    email: document.getElementById("email").value,
	password: document.getElementById("password").value,
	state: document.getElementById("state").value,
	phone: document.getElementById("phone").value,
	plate: document.getElementById("plate").value, 
    profile_picture: downloadURL
  });
		});
	});
	
	
	

}

// WRITING A NEW POST

function writeNewPost(uid, username, picture, title, body) {
	
	var image = document.getElementById("file").files[0];
	var imageName = image.name;
	
	//firebase ref
	var storageRef = firebase.storage().ref('postimages/'+imageName);
	
	var uploadTask = storageRef.put(image);
	
	uploadTask.on('state_changed', function(snapshot){
		var progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
		console.log("upload"+progress+"done");
				  },
	 function(error){
		console.log(error.message);
	}, 
				 function(){
		uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
			 var postData = {
    author: "author",
    uid: "uid",
    body: document.getElementById("postarea").value,
    title: "",
    starCount: 0,
    authorPic: downloadURL
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);

		});
	});

}

