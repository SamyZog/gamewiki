import Image from "next/image";
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
			<Image
				quality={50}
				height={300}
				width={500}
				layout="intrinsic"
				objectFit="cover"
				src={background_image || "/placeholder.jpg"}
				alt={name}
			/>
			<Hstack className={styles.meta}>
				Release date:
				<Text>{released}</Text>
			</Hstack>
		</Vstack>
	);
};

export default memo(GameCard);
