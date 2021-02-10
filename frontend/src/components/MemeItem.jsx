import React, { Component } from "react";
import {
	Image,
	List,
	Grid,
	Button,
	Icon,
	Label,
	Divider,
} from "semantic-ui-react";
import axios from "axios";
import "./main.css";
import EditField from "../components/editfrom.jsx";

const { API } = require("../global/constants");

// main Child component to render list item
export default class MemeItem extends Component {
	state = { likes: this.props.meme.likes, edit: false, delete: false };

	// function to handle likes
	// async patch function
	handleLikeClick = async (event) => {
		let newClicks = this.state.likes + 1;
		this.setState({ likes: newClicks });
		const URI = `${API}memes/${this.props.meme._id}`;
		await axios
			.patch(URI, { likes: newClicks })
			.then((res) => {
				console.log("liked");
			})
			.catch((e) => {
				console.log("ERROR at updateMeme", e);
			});
	};

	// toggles edit button state
	handleEditClick = (event) => {
		this.setState({ edit: !this.state.edit });
	};

	// handles delete click
	// just a utility function to reduce spam
	handleDeleteClick = (event) => {
		event.preventDefault();
		axios
			.delete(`${API}memes/${this.props.meme._id}`)
			.then((res) => {
				this.setState({ delete: !this.state.delete });
				window.location.reload();
			})
			.catch((e) => {
				this.setState({ dbErr: "1" });
				console.log("ERROR at deleteMeme", e);
			});
	};
	render() {
		let dateAndTime = new Date(this.props.meme.createdAt);
		let converted = dateAndTime.toString();
		let date = converted.slice(4, 15);
		let time = converted.slice(16, 24);
		return (
			<Grid.Row centered className="meme">
				<List.Item>
					<List.Content>
						<List.Header as="h2">{this.props.meme.caption}</List.Header>
					</List.Content>
					<Image className="image" src={this.props.meme.url} />
					<List.Content>
						<List.Description>
							Submitted by{" "}
							<b style={{ color: "yellow" }}>{this.props.meme.name}</b> on{" "}
							<i>{date}</i> at <i>{time}</i>
						</List.Description>
					</List.Content>
					<Button color="blue" onClick={this.handleEditClick}>
						Edit
					</Button>
					<Button as="div" labelPosition="right" onClick={this.handleLikeClick}>
						<Button icon>
							<Icon name="heart" />
							Like
						</Button>
						<Label as="a" basic pointing="left">
							{this.state.likes}
						</Label>
					</Button>
					<Button color="red" onClick={this.handleDeleteClick}>
						Delete
					</Button>
					{this.state.edit ? (
						<EditField
							toggleEdit={this.handleEditClick}
							id={this.props.meme._id}
							meme={this.props.meme}
						/>
					) : null}
					<Divider />
				</List.Item>
			</Grid.Row>
		);
	}
}
