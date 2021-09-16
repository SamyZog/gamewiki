import { forwardRef, memo } from "react";
import { joinClasses } from "../../utils/joinClasses";
import styles from "./Input.module.scss";

const Input = ({ className, ...props }, ref) => {
	const css = joinClasses(styles.Input, className);

	return <input ref={ref} {...props} className={css} />;
};

export default memo(forwardRef(Input));
