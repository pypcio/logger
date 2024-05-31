import { Container, Flex, Skeleton, Text } from "@radix-ui/themes";

const ActionFormSkeleton = () => {
	return (
		<Container size='2' align='left'>
			<Flex direction='column' gap='3' justify='start'>
				<Text>
					<Skeleton className='h-6 w-full'></Skeleton>
				</Text>
				<Text>
					<Skeleton className='h-6 w-full'></Skeleton>
				</Text>

				<Skeleton>
					<Text className='h-80 w-full'></Text>
				</Skeleton>
			</Flex>
		</Container>
	);
};

export default ActionFormSkeleton;
