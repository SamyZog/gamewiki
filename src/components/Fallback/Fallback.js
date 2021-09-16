import Center from "../Center/Center";
import Spinner from "../Spinner/Spinner";
import styles from "./Fallback.module.scss";

const Fallback = (props) => {
	return (
		<Center className={styles.Fallback}>
			<Spinner />
		</Center>
	);
};

export default Fallback;
