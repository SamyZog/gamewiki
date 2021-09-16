import { memo, useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import BaseButton from "../BaseButton/BaseButton";
import Box from "../Box/Box";
import Vstack from "../Vstack/Vstack";
import styles from "./DropDown.module.scss";

const DropDown = ({ children, isLoading, initialChoice, filter, choices, ...props }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const listRef = useRef();

	const toggleMenu = () => {
		setOpen(!open);
	};

	const closeMenu = (e) => {
		if (!menuRef.current.contains(e.target)) {
			setOpen(false);
		}
	};

	const closeHandler = (e) => {
		if (filter) return;
		if (e.target.closest("button")) {
			setOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", closeMenu);
		return () => window.removeEventListener("click", closeMenu);
	}, []);

	return (
		<Box ref={menuRef} className={styles.DropDown}>
			<BaseButton isLoading={isLoading} className={styles.currentChoice} onClick={toggleMenu}>
				{choices ? `${choices} filter${choices.toString().endsWith("1") ? "" : "s"}` : initialChoice}
				<RiArrowDownSLine />
			</BaseButton>
			{open && (
				<Vstack ref={listRef} as="ul" className={styles.choiceList} onClick={closeHandler}>
					{children}
				</Vstack>
			)}
		</Box>
	);
};

export default memo(DropDown);
