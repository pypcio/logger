import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const Header = () => {
	return (
		<Flex maxWidth='400px' align='center' justify='center'>
			<Heading wrap='pretty'>Siema gdzie tam sie logujesz</Heading>
		</Flex>
	);
};

export default Header;
