import { Organization, OrganizationMembership } from "@prisma/client";

export interface OrgMembershipInfo extends OrganizationMembership {
	organization: Organization;
}
