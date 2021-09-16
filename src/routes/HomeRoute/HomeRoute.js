import { memo } from "react";
import Container from "../../components/Container/Container";
import Text from "../../components/Text/Text";
import ToTop from "../../components/ToTop/ToTop";
import Vstack from "../../components/Vstack/Vstack";
import Discover from "../../containers/Discover/Discover";
import Gallery from "../../containers/Gallery/Gallery";
import styles from "./HomeRoute.module.scss";

const HomeRoute = (props) => {
	return (
		<Container>
			<Vstack as="section" className={styles.HomeRoute}>
				<Text as="h1" className={styles.banner}>
					NEW & POPULAR RELEASES
				</Text>
				<Discover />
				<Gallery />
				<ToTop />
			</Vstack>
		</Container>
	);
};

export default memo(HomeRoute);
