/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { joinClasses } from "../../utils/joinClasses";
import BaseButton from "../BaseButton/BaseButton";
import Box from "../Box/Box";
import Hstack from "../Hstack/Hstack";
import styles from "./Slider.module.scss";

const Slider = ({ images, name, touch, hover, auto }) => {
	const sliderRef = useRef();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [width, setWidth] = useState(null);
	const initialX = useRef();
	const deltaX = useRef();
	const timeoutRef = useRef();

	useEffect(() => {
		if (auto) {
			timeoutRef.current = setTimeout(() => {
				getnextSlide();
			}, 3000);
			return () => clearTimeout(timeoutRef.current);
		}
	}, [currentSlide]);

	useEffect(() => {
		const width = sliderRef.current.getBoundingClientRect().width;
		setWidth(width);
	}, []);

	const getnextSlide = () => {
		let next = currentSlide + 1;
		if (next > images.length - 1) {
			next = 0;
		}
		setCurrentSlide(next);
	};

	const getPreviousSlide = () => {
		let next = currentSlide - 1;
		if (next < 0) {
			next = images.length - 1;
		}
		setCurrentSlide(next);
	};

	const setSlideManually = (i) => {
		setCurrentSlide(i);
	};

	const handleTouchStart = (e) => {
		initialX.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e) => {
		deltaX.current = e.targetTouches[0].clientX - initialX.current;
	};

	const handleTouchEnd = (e) => {
		if (deltaX.current > 50) {
			getPreviousSlide();
		} else if (deltaX.current) {
			getnextSlide();
		}
	};

	return (
		<Box
			ref={sliderRef}
			className={styles.Slider}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<Hstack className={styles.track} style={{ transform: `translateX(-${currentSlide * width}px)` }}>
				{images.map(({ id, image }) => {
					return (
						<img decoding="async" loading="lazy" className={styles.slide} key={id} src={image} alt={name} />
					);
				})}
			</Hstack>
			<Hstack className={styles.overlay}>
				{images.map(({ id }, i) => {
					return (
						<Box
							className={styles.invisibleSelectors}
							key={id}
							onMouseOver={setSlideManually.bind(null, i)}
						/>
					);
				})}
			</Hstack>
			{images.length > 2 && (
				<Hstack className={styles.selectorButtons}>
					{images.map(({ id }, i) => {
						const css = joinClasses(styles.selectorButton, currentSlide === i && styles.selected);
						return <BaseButton className={css} key={id} onClick={setSlideManually.bind(null, i)} />;
					})}
				</Hstack>
			)}
		</Box>
	);
};

export default Slider;
