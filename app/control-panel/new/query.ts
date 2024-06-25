import { getEventById, getEventsByDeviceId } from "@/lib/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createAction, updateAction, deleteAction } from "@/lib/services/api";
import { ActionType } from "@/schemas/schemas-types";
export const useEvents = (deviceId: string | undefined) =>
	useQuery({
		queryKey: ["events", deviceId],
		queryFn: () => getEventsByDeviceId(deviceId),
		enabled: !!deviceId,
	});

export const useEvent = (
	eventId: number | null | undefined,
	deviceId: string | undefined
) =>
	useQuery({
		queryKey: ["event", eventId, deviceId],
		queryFn: () => getEventById(eventId, deviceId),
		enabled: !!eventId || !!deviceId,
	});

// Hook for POST request
export const useCreateAction = (data: ActionType) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["allPlantsWithActions"],
		mutationFn: () => createAction(data),
		// onSuccess: (data: ActionType, variables: any) => {
		// 	queryClient.setQueryData(
		// 		["allPlantsWithActions", { id: variables.id }],
		// 		data
		// 	);
		// },
	});
};
