// *? n5-reto-tecnico-ui/components/fullScreenSpinner.tsx

"use client";

import { Spinner } from "@heroui/spinner";

export const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Spinner
        classNames={{
          label: "text-white mt-4",
        }}
        color="primary"
        label="Cargando..."
        labelColor="primary"
        size="lg"
      />
    </div>
  );
};
