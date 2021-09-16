import { memo } from "react";
import Center from "../../components/Center/Center";
import Container from "../../components/Container/Container";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
	return (
		<Center as="main" className={styles.Layout}>
			<Container>{children}</Container>
		</Center>
	);
};

export default memo(Layout);
