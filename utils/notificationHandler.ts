// *? n5-reto-tecnico-ui/utils/notificationHandler.ts

import { toast } from "sonner";

export const handleApiResponse = async (
  apiCall: () => Promise<any>,
  successMessage: string,
) => {
  try {
    await apiCall();
    toast.success(successMessage);
  } catch (error: any) {
    const errorDetail =
      error?.response?.data?.detail || "An unexpected error occurred.";

    toast.error(`Error: ${errorDetail}`);
  }
};
