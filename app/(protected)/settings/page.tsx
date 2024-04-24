import { auth } from "@/auth";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";

const SettingsPage = async () => {
	const session = await auth();
	return (
		<div>
			{JSON.stringify(session)}
			<LoginButton />
			<LogoutButton />
		</div>
	);
};

export default SettingsPage;
