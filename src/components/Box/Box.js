import { forwardRef, memo } from "react";

const Box = ({ children, as: As, className, ...props }, ref) => {
	As ??= As || "div";
	return (
		<As ref={ref} className={className} {...props}>
			{children}
		</As>
	);
};

export default memo(forwardRef(Box));
