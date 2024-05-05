"use client";
import { Text } from "@radix-ui/themes";
import React from "react";

const FillerPage = () => {
	// Generate a large number of list items to simulate long content
	const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

	return (
		<div className='flex flex-col h-full overflow-auto p-4 grow'>
			<h1>Long Content Component</h1>
			<ul>
				{items.map((item) => (
					<li
						key={item}
						style={{
							padding: "0",
							border: "1px solid #ccc",
							margin: "0",
						}}>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
						<Text wrap='pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
							ipsa maxime corrupti! Sed suscipit quidem voluptas odio, et
							temporibus cum impedit possimus alias provident nobis illum sint
							deleniti delectus cumque.
						</Text>
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
