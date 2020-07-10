import React, { useState, useEffect } from "react";
import "./Post.css";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import { Button, Input } from "@material-ui/core";

function Post({ postId, user, username, caption, imageUrl }) {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");

	useEffect(() => {
		// this is where the code
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection("posts")
				.doc(postId)
				.collection("comments")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}
		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (event) => {

		event.preventDefault();
		db.collection("posts").doc(postId).collection("comments").add({
			comment: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		setComment('');

	};

	return (
		<div className="post">
			<div className="post_header">
				<Avatar className="post_avatar" src="../1.png" alt="rajeshYadav" />
				<h3> {username} </h3>
			</div>

			{/* header -> avatar + username  */}
			<img className="post_image" src={imageUrl} alt="" />
			{/* image  */}
			<h4 className="post_text">
				<strong> {username} : </strong>
				{caption}
			</h4>

			{/* username + caption  */}
			<div className="post_comments">
				{comments.map((comment) => (
					<p>
						<strong>{comment.username}</strong> {comment.comment}
					</p>
				))}
			</div>

			{
				user && (

			<form action="" className="post_commentBox">
				<Input
					type="text"
					className="post_input"
					placeholder="Add a comments..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<Button
					className="post_button"
					disabled={!comment}
					type="submit"
					onClick={postComment}
				>
					Post
				</Button>
			</form>
				)
			}

		</div>
	);
}

export default Post;
