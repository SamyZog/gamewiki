import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import Box from "../Box/Box";
import styles from "./Text.module.scss";

const Text = ({ children, as = "p", className, ...props }, ref) => {
	const css = joinClasses(styles.Text, className);

	return (
		<Box as={as} className={css} {...props}>
			{children}
		</Box>
	);
};

export default memo(forwardRef(Text));
