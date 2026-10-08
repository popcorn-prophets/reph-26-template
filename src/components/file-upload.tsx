"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

/** Posts the chosen file as FormData ("file") to a Server Action that calls parseTable(). */
export function FileUpload({
  action,
  accept = ".csv,.xlsx",
}: {
  action: (formData: FormData) => Promise<{ error: string } | void>;
  accept?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <Input
      type="file"
      accept={accept}
      disabled={pending}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.set("file", file);
        start(async () => {
          const res = await action(fd);
          if (res && "error" in res) toast.error(res.error);
          else toast.success(`Uploaded ${file.name}`);
        });
      }}
    />
  );
}
