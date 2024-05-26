import { getOrganizationEntitiesActions } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
export const useOrganizationEntitiesActions = (entityId: string | null) =>
	useQuery({
		queryKey: ["allPlantsWithActions", entityId],
		queryFn: () => getOrganizationEntitiesActions(entityId),
		enabled: !!entityId,
	});
