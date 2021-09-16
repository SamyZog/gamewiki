import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import styles from "./Divider.module.scss";

const Divider = ({ className, ...props }, ref) => {
	const css = joinClasses(styles.Divider, className);

	return <hr ref={ref} className={css} {...props} />;
};

export default memo(forwardRef(Divider));
