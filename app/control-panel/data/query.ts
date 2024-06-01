import { getOrganizationEntitiesActions } from "@/lib/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createAction, updateAction, deleteAction } from "@/lib/services/api";
import { ActionType } from "@/schemas/schemas-types";
export const useOrganizationEntitiesActions = (entityId: string | null) =>
	useQuery({
		queryKey: ["allPlantsWithActions", entityId],
		queryFn: () => getOrganizationEntitiesActions(entityId),
		enabled: !!entityId,
	});

// // Hook for POST request
// export const useCreateAction = ({
// 	entityId,
// 	data,
// }: {
// 	entityId: string;
// 	data: ActionType;
// }) => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationKey: ["allPlantsWithActions", entityId],
// 		mutationFn: () => createAction(entityId, data),
// 		onSuccess: (data: ActionType, variables: any) => {
// 			queryClient.setQueryData(
// 				["allPlantsWithActions", { id: variables.id }],
// 				data
// 			);
// 		},
// 	});
// };

// // Hook for PATCH request
// export const useUpdateAction = () => {
//   return useMutation(({ entityId, id, data }: { entityId: string, id: string, data: ActionType }) => updateAction(entityId, id, data));
// };

// // Hook for DELETE request
// export const useDeleteAction = () => {
//   return useMutation(({ entityId, id }: { entityId: string, id: ActionType }) => deleteAction(entityId, id));
// };
