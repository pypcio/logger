"use client";
import React from "react";

const LongContent = () => {
	// Generate a large number of list items to simulate long content
	const items = Array.from({ length: 101 }, (_, index) => `Item ${index + 1}`);

	return (
		<div style={{ padding: "20px" }}>
			<h1>Long Content Component</h1>
			<ul>
				{items.map((item) => (
					<li key={item} style={{ padding: "10px", border: "1px solid #ccc", margin: "10px 0" }}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default LongContent;
