import { apiClient } from "./client";

export type CommunityUnitOption = {
  unitId: number;
  name: string;
  cellCategory: "S" | "A" | "B" | "C" | null;
};

export async function getActiveCells(): Promise<CommunityUnitOption[]> {
  const response = await apiClient.get<CommunityUnitOption[]>(
    "/api/community-units/cells",
  );

  console.log("getActiveCells() response:", response.data);

  return response.data;
}
