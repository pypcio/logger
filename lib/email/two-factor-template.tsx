import {
	Html,
	Body,
	Container,
	Text,
	Link,
	Preview,
	Tailwind,
} from "@react-email/components";

interface Props {
	name: string;
	token: string;
}

const TwoFactorTemplate = ({ name, token }: Props) => {
	return (
		<Html>
			<Tailwind>
				<h3>Two factor authentication</h3>
				<Body className='bg-white'>
					<Container>
						<Text className='font-bold text-3xl'>Hello {name}</Text>
						<Text className='text-center m-auto'> Your Code: </Text>
						<Text className='text-center m-auto'> {token} </Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default TwoFactorTemplate;

// export enum EmailTopics {
// 	RESET = "Reset Password",
// 	VERIFY = "Verify your email",
// 	REGISTER = "Welcome aboard!",
// }
