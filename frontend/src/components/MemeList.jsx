import React from "react";
import { List, Container, Grid } from "semantic-ui-react";
import MemeItem from "./MemeItem.jsx";

// Responsible to render full Memes list on frontend
// parent component of MemeItem
const MemeList = (props) => {
	const renderedList = props.memes.map((meme) => {
		return <MemeItem key={meme._id} meme={meme} />;
	});
	return (
		<Container>
			<List relaxed>
				<Grid>{renderedList}</Grid>
			</List>
		</Container>
	);
};

export default MemeList;
