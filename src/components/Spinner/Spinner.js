import { forwardRef, memo } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { joinClasses } from "../../utils/joinClasses";
import Center from "../Box/Box";
import styles from "./Spinner.module.scss";

const Spinner = ({ className, ...props }, ref) => {
	const css = joinClasses(styles.Spinner, className);

	return (
		<Center className={css} {...props}>
			<RiLoader4Fill />
		</Center>
	);
};

export default memo(forwardRef(Spinner));
