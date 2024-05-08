/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [{ key: "referrer-policy", value: "no-referrer" }],
			},
		];
	},
	transpilePackages: ["lucide-react"], // add this
};

export default nextConfig;
