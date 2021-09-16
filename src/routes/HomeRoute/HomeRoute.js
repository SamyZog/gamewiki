import { memo } from "react";
import Text from "../../components/Text/Text";
import ToTop from "../../components/ToTop/ToTop";
import Vstack from "../../components/Vstack/Vstack";
import Discover from "../../containers/Discover/Discover";
import Gallery from "../../containers/Gallery/Gallery";
import styles from "./HomeRoute.module.scss";

const HomeRoute = (props) => {
	return (
		<Vstack as="section" className={styles.HomeRoute}>
			<ToTop />
			<Text as="h1" className={styles.banner}>
				NEW & POPULAR RELEASES
			</Text>
			<Discover />
			<Gallery />
		</Vstack>
	);
};

export default memo(HomeRoute);
