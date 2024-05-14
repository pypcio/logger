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
}

const RequestAddToCompanyTemplate = ({ name }: Props) => {
	return (
		<Html>
			<Tailwind>
				<h3>Reset Password</h3>
				<Body className='bg-white'>
					<Container>
						<Text className='font-bold text-3xl'>
							{" "}
							User {name}
							<br /> is sending request.{" "}
						</Text>
						<Link href={`${process.env.BASE_URL}/panel/company`}>
							Click Here
						</Link>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default RequestAddToCompanyTemplate;
