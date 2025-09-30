import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useDemoUser } from "../../hooks/useDemoUser";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isDemoUser } = useDemoUser();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (setting) => {
      if (isDemoUser) {
        toast.error("Demo users cannot update settings. This is a read-only demo.");
        throw new Error("Demo restriction");
      }
      return updateSettingApi(setting);
    },
    onSuccess: () => {
      toast.success("Setting Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}
