import { RiArrowUpSLine } from "react-icons/ri";
import BaseButton from "../BaseButton/BaseButton";
import styles from "./ToTop.module.scss";

const ToTop = (props) => {
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return (
		<BaseButton className={styles.ToTop} onClick={scrollToTop}>
			<RiArrowUpSLine />
		</BaseButton>
	);
};

export default ToTop;
