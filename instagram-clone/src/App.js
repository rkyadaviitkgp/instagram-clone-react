import React, { useState, useEffect } from "react";
import logo from "../images.png";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState(null);
	const [openSignIn, setOpenSignIn] = useState(false);

	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();
	// useEffect : runs a piesce of code based on a condition

	useEffect(() => {
		// this is where the code
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data(),
					}))
				);
			});
	}, []);

	useEffect(() => {
		// this is where the code
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user is logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				//user has logged out
				setUser(null);
			}
		});
		return () => {
			//some clean up state
			unsubscribe();
		};
	}, [user, username]);

	const singUp = (event) => {
		event.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({ displayName: username });
			})
			.catch((error) => alert(error.message));
		setOpen(false);
	};

	const signIn = (event) => {
		event.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));
		setOpenSignIn(false);
	};

	return (
		<div className="App">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app_singup">
						<center>
							<img
								className="app_headerImage"
								src="https://ucentralmedia.com/wp-content/uploads/2020/04/Instagram-logo.jpg"
								alt=""
							/>
						</center>
						<Input
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							type="text"
						/>
						<Input
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="text"
						/>
						<Input
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
						<Button type="submit" onClick={singUp}>
							singUp
						</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app_singup">
						<center>
							<img
								className="app_headerImage"
								src="https://ucentralmedia.com/wp-content/uploads/2020/04/Instagram-logo.jpg"
								alt=""
							/>
						</center>
						<Input
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="text"
						/>
						<Input
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
						<Button type="submit" onClick={signIn}>
							singUp
						</Button>
					</form>
				</div>
			</Modal>

			<div className="app_header">
				<img className="app_headerImage" src={logo} alt="" />

				{user ? (
					<Button onClick={() => auth.signOut()}>Logout</Button>
				) : (
					<div className="app_loginContainer">
						<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
						<Button onClick={() => setOpen(true)}>Sign Up</Button>
					</div>
				)}
			</div>

			<div className="app_post">
        <div className="app_postsLeft">
        {posts.map(({ id, post }) => (
					<Post
						key={id}
            postId={id}
            user={user}
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
					/>
				))}
        </div>

        <div className="app_postsRight">
        <InstagramEmbed
				url="https://www.instagram.com/p/CCbKS2CpI4W/"
				maxWidth={320}
				hideCaption={false}
				containerTagName="div"
				protocol=""
				injectScript
				onLoading={() => {}}
				onSuccess={() => {}}
				onAfterRender={() => {}}
				onFailure={() => {}}
			/>
        </div>
			</div>

			{user ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3> Sorry, You need to login </h3>
			)}
		</div>
	);
}
export default App;
