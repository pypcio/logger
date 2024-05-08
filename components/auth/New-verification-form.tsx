"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verifications";
import CardWrapper from "@/components/auth/CardWrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { BeatLoader } from "react-spinners";

const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError("Missing token!");
			return;
		}

		newVerification(token)
			.then((data) => {
				if (data?.error) {
					setError(data.error);
				}

				if (data?.success) {
					setSuccess(data.success);
				}
			})
			.catch(() => setError("Something went wrong"));
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			mainLabel='Auth'
			headerLabel='Confirming your verification'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			showBackButton>
			<div className='flex items-center w-full justify-center'>
				{!success && !error && <BeatLoader />}
				{!success && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationForm;
