import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import Box from "../Box/Box";
import Spinner from "../Spinner/Spinner";
import styles from "./BaseButton.module.scss";

const BaseButton = ({ children, className, isLoading, ...props }, ref) => {
	const css = joinClasses(styles.BaseButton, className);

	return (
		<Box ref={ref} as="button" className={css} {...props} disabled={isLoading}>
			{isLoading ? <Spinner /> : children}
		</Box>
	);
};

export default memo(forwardRef(BaseButton));
