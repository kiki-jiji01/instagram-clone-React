import React, {useState,useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from "firebase" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function Post ({postId,user,username,caption,imageUrl}) {
    const[comments, setComments] = useState([]);
    const[comment,setComment] = useState('');
    const[likedname,setLikedname] =useState([]);

    useEffect(() => {
      let unsubscribe ;
      if (postId) {
        unsubscribe =db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      }

      return () => {
      unsubscribe();
      };
    },[postId]);


    useEffect(() => {
      let unsubscribe ;
      if (postId) {
        unsubscribe =db
        .collection("posts")
        .doc(postId)
        .collection("likedname")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setLikedname(snapshot.docs.map((doc) => doc.data()));
        });
      }

      return () => {
      unsubscribe();
      };
    },[postId]);



    const iconClick = (event) => {
      event.preventDefault();
      db.collection("posts").doc(postId).collection("likedname").add({
        usernames: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
     }



    const postComment = (event) => {
     event.preventDefault();

     db.collection("posts").doc(postId).collection("comments").add({
       text: comment,
       username: user.displayName,
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
     setComment('');
    }

   return(
     <div className="post">
      <div className="post_header">
       <Avatar
       className="post_avatar"
       alt="Gafe"
       src="/static/images/avatar/1.jpg"
      />
       <h3>{username}</h3>
      </div>

       <img className="post_image" src={imageUrl} alt=""/>




      <div className="icon">

       <FontAwesomeIcon icon={faHeart} size="lg" style={{color: "FF3366"}} onClick={iconClick}/>

      <div className="likedby">
       <p>
       Liked by
      {likedname.map((like) => (
      <strong className="likednames">{like.usernames}</strong>
       ))}
       </p>
      </div>
    </div>





       <h4 className="post_text"><strong className="strongtext">{username}</strong>{caption}</h4>




       <div className="post_comments" >
       {comments.map((comment) => (
         <p>
         <strong>{comment.username}</strong> {comment.text}
         </p>
       ))}
       </div>




     {user &&(
       <form className="post_commentBox">
        <input
         className="post_input"
         type="text"
         placeholder="Add a comment..."
         value={comment}
         onChange = {(e) => setComment(e.target.value)}
        />
        <button
         className="post_button"
         disable={!comment}
         type="submit"
         onClick={postComment}
         >
        Post
        </button>
       </form>
    )}

     </div>
   )
}

export default Post;
