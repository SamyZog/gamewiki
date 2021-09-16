import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import Box from "../Box/Box";
import styles from "./Badge.module.scss";

const Badge = ({ children, className, ...props }, ref) => {
	const css = joinClasses(styles.Badge, className);

	return (
		<Box className={css} {...props}>
			{children}
		</Box>
	);
};

export default memo(forwardRef(Badge));
