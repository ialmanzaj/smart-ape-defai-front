import React from "react";

const Skeleton: React.FC = () => (
	<div className="lines">
		<div className="line pulse"></div>
		<div className="line pulse"></div>
		<div className="line pulse"></div>
		<div className="line pulse"></div>
	</div>
);

export default Skeleton;
