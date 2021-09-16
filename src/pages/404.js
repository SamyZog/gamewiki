import Box from "../components/Box/Box";
import Center from "../components/Center/Center";
import RouteLink from "../components/RouteLink/RouteLink";
import Text from "../components/Text/Text";
import Vstack from "../components/Vstack/Vstack";

const Custom404 = (props) => {
	return (
		<Box>
			<Center style={{ minHeight: "90vh" }}>
				<Vstack>
					<Text as="h1" style={{ textAlign: "center", fontSize: "var(--text-6xl)" }}>
						!404!
					</Text>
					<Text as="h1">
						I see that you&apos;re lost... <RouteLink href="/">click here</RouteLink>
					</Text>
				</Vstack>
			</Center>
		</Box>
	);
};

export default Custom404;
