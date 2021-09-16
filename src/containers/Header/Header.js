import { memo } from "react";
import { IoGameController } from "react-icons/io5";
import Center from "../../components/Center/Center";
import Container from "../../components/Container/Container";
import Hstack from "../../components/Hstack/Hstack";
import RouteLink from "../../components/RouteLink/RouteLink";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<Center as="header" className={styles.Header}>
			<Container>
				<Hstack className={styles.content}>
					<RouteLink href="/">
						<IoGameController />
					</RouteLink>
					<SearchBar />
				</Hstack>
			</Container>
		</Center>
	);
};

export default memo(Header);
