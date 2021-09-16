import { memo } from "react";
import Center from "../../components/Center/Center";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
	return (
		<Center as="main" className={styles.Layout}>
			{children}
		</Center>
	);
};

export default memo(Layout);
