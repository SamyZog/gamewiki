/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import Badge from "../Badge/Badge";
import Hstack from "../Hstack/Hstack";
import RouteLink from "../RouteLink/RouteLink";
import Text from "../Text/Text";
import Vstack from "../Vstack/Vstack";
import styles from "./GameCard.module.scss";

const GameCard = ({ id, slug, name, released, rating, background_image, counter }) => {
	return (
		<Vstack className={styles.GameCard} style={{}}>
			<Hstack className={styles.head}>
				<RouteLink href={`/game/${slug}`}>{name}</RouteLink>
				<Badge>{rating.toFixed(2)}</Badge>
			</Hstack>
			<img className={styles.poster} src={background_image} alt={name} />
			<Hstack className={styles.meta}>
				Release date:
				<Text>{released}</Text>
			</Hstack>
		</Vstack>
	);
};

export default memo(GameCard);
