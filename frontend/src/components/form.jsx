import React, { Component } from "react";
import { Form, Button, Container, Grid, Label } from "semantic-ui-react";
import axios from "axios";
import "./main.css";
const { API } = require("../global/constants");

// main Form field to submit meme
export default class FormField extends Component {
	state = {
		name: "",
		caption: "",
		url: "",
		nameErr: "",
		captionErr: "",
		urlErr: "",
		dbErr: "",
	};

	// validation checks on form fields
	validate = () => {
		let nameErr = "";
		let captionErr = "";
		let urlErr = "";
		if (this.state.name.length < 3) {
			nameErr = "1";
			this.setState({ nameErr });
			return false;
		}
		this.setState({ nameErr: "" });
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

	// handles form submissions(async)
	handleSubmit = async (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			const meme = {
				name: this.state.name,
				caption: this.state.caption,
				url: this.state.url,
			};
			await axios
				.post(`${API}memes`, meme)
				.then((res) => {
					this.setState({ name: "", caption: "", url: "" });
					this.setState({ nameErr: "", captionErr: "", urlErr: "" });
					window.location.reload();
				})
				.catch((e) => {
					alert("Meme already exists or URL too long to index");
					this.setState({ dbErr: "1" });
					console.log("ERROR at createMeme", e);
				});
		}
	};

	// standard state changes handling
	handleNameChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleCaptionChange = (event) => {
		this.setState({ caption: event.target.value });
	};

	handleURLChange = (event) => {
		this.setState({ url: event.target.value });
	};

	render() {
		// checking for errors from above validation checks
		let nameLabel = "";
		let captionLabel = "";
		let urlLabel = "";
		if (this.state.nameErr !== "") {
			nameLabel = (
				<Label basic color="red" pointing="bottom">
					Name should be 3 chars atleast
				</Label>
			);
		}
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
									<Label content="Name" />
									<input
										value={this.state.name}
										className="inputField"
										placeholder="Enter you name here"
										onChange={this.handleNameChange}
									/>
									{nameLabel}
								</Form.Field>
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
								Submit New Meme
							</Button>
						</Grid.Row>
					</Grid>
				</Form>
			</Container>
		);
	}
}
