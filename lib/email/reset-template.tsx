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

const ResetTemplate = ({ name, token }: Props) => {
	return (
		<Html>
			<Tailwind>
				<h3>Reset Password</h3>
				<Body className='bg-white'>
					<Container>
						<Text className='font-bold text-3xl'>Hello {name}</Text>
						<Link
							href={`${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`}>
							Click Here
						</Link>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ResetTemplate;
