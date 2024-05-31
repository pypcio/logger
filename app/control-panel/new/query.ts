import { getEventById, getEventsByGroupId } from "@/lib/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createAction, updateAction, deleteAction } from "@/lib/services/api";
import { ActionType } from "@/schemas/schemas-types";
export const useEvents = (eventGroupId: string | undefined) =>
	useQuery({
		queryKey: ["events", eventGroupId],
		queryFn: () => getEventsByGroupId(eventGroupId),
		enabled: !!eventGroupId,
	});

export const useEvent = (eventId: number | null) =>
	useQuery({
		queryKey: ["event", eventId],
		queryFn: () => getEventById(eventId),
		enabled: !!eventId,
	});

// Hook for POST request
export const useCreateAction = ({
	entityId,
	data,
}: {
	entityId: string;
	data: ActionType;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["allPlantsWithActions", entityId],
		mutationFn: () => createAction(entityId, data),
		onSuccess: (data: ActionType, variables: any) => {
			queryClient.setQueryData(
				["allPlantsWithActions", { id: variables.id }],
				data
			);
		},
	});
};
