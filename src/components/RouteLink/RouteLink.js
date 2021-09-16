import Link from "next/link";
import { forwardRef, memo } from "react";
import BaseLink from "../BaseLink/BaseLink";

const RouteLink = ({ children, href, ...props }, ref) => {
	return (
		<Link href={href} passHref>
			<BaseLink {...props}>{children}</BaseLink>
		</Link>
	);
};

export default memo(forwardRef(RouteLink));
