import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import styles from "./BaseLink.module.scss";

const BaseLink = ({ children, className, ...props }, ref) => {
	const css = joinClasses(styles.BaseLink, className);

	return (
		<a ref={ref} className={css} {...props}>
			{children}
		</a>
	);
};

export default memo(forwardRef(BaseLink));
