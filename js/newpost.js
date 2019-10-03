function postLoader(postId, title, text, author, authorId, authorPic) {
	var uid = firebase.auth().currentUser.uid;
	
	var html = '<div class="newpost">'+
			
		'<div class="post post-' + postId  + ' mdl-cell mdl-cell--12-col ' +
                  'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
        '<div class="mdl-card mdl-shadow--2dp">' +
          '<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
            '<h4 class="mdl-card__title-text"></h4>' +
          '</div>' +
          '<div class="header">' +
            '<div>' +
              '<div class="avatar"></div>' +
              '<div class="username mdl-color-text--black"></div>' +
            '</div>' +
          '</div>' +
          '<span class="star">' +
            '<div class="not-starred material-icons">star_border</div>' +
            '<div class="starred material-icons">star</div>' +
            '<div class="star-count">0</div>' +
          '</span>' +
          '<div class="text"></div>' +
          '<div class="comments-container"></div>' +
          '<form class="add-comment" action="#">' +
            '<div class="mdl-textfield mdl-js-textfield">' +
              '<input class="mdl-textfield__input new-comment" type="text">' +
              '<label class="mdl-textfield__label">Comment...</label>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>'+
'</div>';

    let wrap = document.getElementById("postmain");
    //gets page content height
    let contentHeight = wrap.offsetHeight;
    //get vertical scroll content height
    let yOffset = window.pageYOffset;
    let y = yOffset + window.innerHeight;
    if (y >= contentHeight){
        wrap.innerHTML += html;
   //Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
//  if (componentHandler) {
//    componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
//  }
		
	 var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
  var commentInput = postElement.getElementsByClassName('new-comment')[0];
  var star = postElement.getElementsByClassName('starred')[0];
  var unStar = postElement.getElementsByClassName('not-starred')[0];
	
	
  // [START my_top_posts_query]
  var myUserId = firebase.auth().currentUser.uid;
  var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  // [END my_top_posts_query]
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // [END recent_posts_query]
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var author = data.val().author || 'Anonymous';
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
        createPostElement(data.key, data.val().title, data.val().body, author, data.val().uid, data.val().authorPic),
        containerElement.firstChild);
    });
    postsRef.on('child_changed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
      postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
      postElement.getElementsByClassName('username')[0].innerText = data.val().author;
      postElement.getElementsByClassName('text')[0].innerText = data.val().body;
      postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
    });
    postsRef.on('child_removed', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      var post = containerElement.getElementsByClassName('post-' + data.key)[0];
      post.parentElement.removeChild(post);
    });
  };

  // Fetching and displaying all posts of each sections.
//  fetchPosts(topUserPostsRef, topUserPostsSection);
//  fetchPosts(recentPostsRef, recentPostsSection);
  fetchPosts(userPostsRef, userPostsSection);

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(topUserPostsRef);
  listeningFirebaseRefs.push(recentPostsRef);
  listeningFirebaseRefs.push(userPostsRef);	
        
    }
}
window.onscroll = postLoader;


///**
// * Saves a new post to the Firebase DB.
// */
//// [START write_fan_out]
//function writeNewPost(uid, username, picture, title, body) {
//  // A post entry.
//  var postData = {
//    author: username,
//    uid: uid,
//    body: body,
//    title: title,
//    starCount: 0,
//    authorPic: picture
//  };
//
//  // Get a key for a new Post.
//  var newPostKey = firebase.database().ref().child('posts').push().key;
//
//  // Write the new post's data simultaneously in the posts list and the user's post list.
//  var updates = {};
//  updates['/posts/' + newPostKey] = postData;
//  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
//
//  return firebase.database().ref().update(updates);
//}
//// [END write_fan_out]
//
///**
// * Star/unstar post.
// */
//// [START post_stars_transaction]
//function toggleStar(postRef, uid) {
//  postRef.transaction(function(post) {
//    if (post) {
//      if (post.stars && post.stars[uid]) {
//        post.starCount--;
//        post.stars[uid] = null;
//      } else {
//        post.starCount++;
//        if (!post.stars) {
//          post.stars = {};
//        }
//        post.stars[uid] = true;
//      }
//    }
//    return post;
//  });
//}
//// [END post_stars_transaction]
//
///**
// * Creates a post element.
// */
//function createPostElement(postId, title, text, author, authorId, authorPic) {
//  var uid = firebase.auth().currentUser.uid;
//
//  var html =
//      '<div class="post post-' + postId + ' mdl-cell mdl-cell--12-col ' +
//                  'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
//        '<div class="mdl-card mdl-shadow--2dp">' +
//          '<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
//            '<h4 class="mdl-card__title-text"></h4>' +
//          '</div>' +
//          '<div class="header">' +
//            '<div>' +
//              '<div class="avatar"></div>' +
//              '<div class="username mdl-color-text--black"></div>' +
//            '</div>' +
//          '</div>' +
//          '<span class="star">' +
//            '<div class="not-starred material-icons">star_border</div>' +
//            '<div class="starred material-icons">star</div>' +
//            '<div class="star-count">0</div>' +
//          '</span>' +
//          '<div class="text"></div>' +
//          '<div class="comments-container"></div>' +
//          '<form class="add-comment" action="#">' +
//            '<div class="mdl-textfield mdl-js-textfield">' +
//              '<input class="mdl-textfield__input new-comment" type="text">' +
//              '<label class="mdl-textfield__label">Comment...</label>' +
//            '</div>' +
//          '</form>' +
//        '</div>' +
//      '</div>';
//
//  // Create the DOM element from the HTML.
//  var div = document.createElement('div');
//  div.innerHTML = html;
//  var postElement = div.firstChild;
//  if (componentHandler) {
//    componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);
//  }
//
//  var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
//  var commentInput = postElement.getElementsByClassName('new-comment')[0];
//  var star = postElement.getElementsByClassName('starred')[0];
//  var unStar = postElement.getElementsByClassName('not-starred')[0];
//
//  // Set values.
//  postElement.getElementsByClassName('text')[0].innerText = text;
//  postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;
//  postElement.getElementsByClassName('username')[0].innerText = author || 'Anonymous';
//  postElement.getElementsByClassName('avatar')[0].style.backgroundImage = 'url("' +
//      (authorPic || './silhouette.jpg') + '")';