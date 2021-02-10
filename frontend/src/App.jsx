import React, { Component } from "react";
import FormField from "./components/form.jsx";
import axios from "axios";
import MemeList from "./components/MemeList.jsx";
import { Pagination, Icon, Header } from "semantic-ui-react";
import "./components/main.css";

// importing constants
const { API } = require("./global/constants.js");

// main App class
export default class App extends Component {
	state = {
		memes: [],
		activePage: 0,
	};
	getAllMemes = async () => {
		const URI = `${API}memes`;
		await axios
			.get(URI)
			.then((res) => {
				this.setState({ memes: res.data });
			})
			.catch((e) => {
				alert("API error");
				console.log("ERROR at getAllMemes", e);
			});
	};

	// responsible to change backgroundColor and fetch memes on component mounting
	async componentDidMount() {
		document.body.style.backgroundColor = "#1b1b1b";
		await this.getAllMemes();
	}

	// helper function for pagination
	handlePageChange = (e, pageInfo) => {
		console.log(pageInfo);
		this.setState({ activePage: pageInfo.activePage - 1 });
	};

	render() {
		let PER_PAGE = 5;
		let totalPages = this.state.memes.length / PER_PAGE;
		let start = this.state.activePage * PER_PAGE;
		let end = start + PER_PAGE;
		return (
			<div>
				<Header className="xmeme" as="h1">
					XMeme
				</Header>
				<br />
				<FormField />
				<br />
				<br />
				<br />
				<MemeList memes={this.state.memes.slice(start, end)} />
				<br />
				<br />
				<br />
				<Pagination
					ActivePage={this.state.activePage}
					onPageChange={this.handlePageChange}
					ellipsisItem={{
						content: <Icon name="ellipsis horizontal" />,
						icon: true,
					}}
					firstItem={{ content: <Icon name="angle double left" />, icon: true }}
					lastItem={{ content: <Icon name="angle double right" />, icon: true }}
					prevItem={{ content: <Icon name="angle left" />, icon: true }}
					nextItem={{ content: <Icon name="angle right" />, icon: true }}
					totalPages={totalPages}
					className="paginator"
				/>
			</div>
		);
	}
}
