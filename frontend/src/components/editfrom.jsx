import React, { Component } from "react";
import { Form, Button, Container, Grid, Label } from "semantic-ui-react";
import axios from "axios";
import "./main.css";
const { API } = require("../global/constants");

// edit form(responsible to edit caption and url field)
export default class EditField extends Component {
	state = {
		caption: this.props.meme.caption,
		url: this.props.meme.url,
		captionErr: "",
		urlErr: "",
		dbErr: "",
	};

	// validating fields
	validate = () => {
		let captionErr = "";
		let urlErr = "";
		if (this.state.caption.length < 3) {
			captionErr = "1";
			this.setState({ captionErr });
			return false;
		}
		this.setState({ captionErr: "" });
		if (
			!this.state.url.includes(".jpg") &&
			!this.state.url.includes("data:image") &&
			!this.state.url.includes(".jpeg") &&
			!this.state.url.includes(".png")
		) {
			urlErr = "1";
			this.setState({ urlErr });
			return false;
		}
		return true;
	};

	// toggles edit in Parent componet(MemeItem)
	handleEdit = () => {
		this.props.toggleEdit();
	};

	// async function to handle submit
	handleSubmit = async (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			const meme = {
				caption: this.state.caption,
				url: this.state.url,
			};
			await axios
				.patch(`${API}memes/${this.props.id}`, meme)
				.then((res) => {
					this.setState({ caption: "", url: "" });
					this.setState({ captionErr: "", urlErr: "" });
					this.handleEdit();
					window.location.reload();
				})
				.catch((e) => {
					this.setState({ dbErr: "1" });
					alert("Meme already exists");
					console.log("ERROR at updateMeme", e);
				});
		}
	};

	// standard state changes handling
	handleCaptionChange = (event) => {
		this.setState({ caption: event.target.value });
	};

	handleURLChange = (event) => {
		this.setState({ url: event.target.value });
	};

	render() {
		// checking for error labels passed by above validation functions
		let captionLabel = "";
		let urlLabel = "";
		if (this.state.captionErr !== "") {
			captionLabel = (
				<Label basic color="red" pointing="bottom">
					Caption should be 3 chars atleast
				</Label>
			);
		}
		if (this.state.urlErr !== "") {
			urlLabel = (
				<Label basic color="red" pointing="bottom">
					Please enter a valid url
				</Label>
			);
		}
		if (this.state.dbErr !== "") {
			urlLabel = (
				<Label basic color="red" pointing="bottom">
					Meme already exists
				</Label>
			);
		}
		return (
			<Container className="form">
				<Form onSubmit={this.handleSubmit}>
					<Grid>
						<Grid.Row centered>
							<Grid.Column width={8}>
								<Form.Field>
									<Label content="Caption" />
									<input
										value={this.state.caption}
										className="inputField"
										placeholder="Enter a caption for meme"
										onChange={this.handleCaptionChange}
									/>
									{captionLabel}
								</Form.Field>
								<Form.Field>
									<Label content="URL" />
									<input
										value={this.state.url}
										className="inputField"
										placeholder="Enter URL of the meme"
										onChange={this.handleURLChange}
									/>
									{urlLabel}
								</Form.Field>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row centered>
							<Button type="submit" primary>
								Update
							</Button>
						</Grid.Row>
					</Grid>
				</Form>
			</Container>
		);
	}
}
