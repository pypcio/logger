"use client";
import { Text } from "@radix-ui/themes";
import React from "react";

const FillerPage = () => {
	// Generate a large number of list items to simulate long content
	const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

	return (
		<div style={{ padding: "20px" }}>
			<h1>Long Content Component</h1>
			<ul>
				{items.map((item) => (
					<li
						key={item}
						style={{
							padding: "10px",
							border: "1px solid #ccc",
							margin: "10px 0",
						}}>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FillerPage;
