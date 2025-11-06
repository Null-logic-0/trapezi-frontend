"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BusinessFormState,
  BusinessInterface,
} from "@/interfaces/places.interface";
import { saveBusinessListing } from "@/lib/api/saveBusinessListing";

type UseBusinessFormOptions = {
  locale: "en" | "ka";
  initialValues?: Partial<BusinessInterface>;
  onSuccessRedirect?: string;
};

export function useBusinessForm({
  locale,
  initialValues = {},
  onSuccessRedirect,
}: UseBusinessFormOptions) {
  const router = useRouter();

  const [state, setState] = useState<BusinessFormState>({
    success: false,
    message: "",
    fieldErrors: {},
    values: initialValues,
  });

  const [isPending, setIsPending] = useState(false);
  const [images, setImages] = useState<File[]>(initialValues.images || []);
  const [menuPdf, setMenuPdf] = useState<File | null>(
    initialValues.menu_pdf || null
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    method: "POST" | "PATCH" = "POST",
    id?: number
  ) => {
    e.preventDefault();
    setIsPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const data: BusinessInterface = {
        business_name: (formData.get("business_name") as string) || "",
        description: (formData.get("description") as string) || "",
        address: (formData.get("address") as string) || "",
        website: (formData.get("website") as string) || "",
        facebook: (formData.get("facebook") as string) || "",
        instagram: (formData.get("instagram") as string) || "",
        tiktok: (formData.get("tiktok") as string) || "",
        categories: formData.getAll("categories[]") as string[],
        images,
        menu_pdf: menuPdf,
      };

      const res = await saveBusinessListing({ id, locale, method, data });

      if (!res) {
        setState({
          success: false,
          message: "No response from server",
          fieldErrors: {},
          values: Object.fromEntries(formData.entries()),
        });
        setIsPending(false);
        return;
      }

      if (!res.success) {
        setState({
          success: false,
          message: res.message || "Request failed",
          fieldErrors: res.errors || {},
          values: Object.fromEntries(formData.entries()),
        });
      } else {
        setState({
          success: true,
          message: res.message || "Saved successfully",
          fieldErrors: {},
          values: {},
        });

        if (onSuccessRedirect) {
          router.push(onSuccessRedirect);
        }
      }
    } catch (error) {
      setState({
        success: false,
        message: error instanceof Error ? error.message : "Unexpected error",
        fieldErrors: {},
        values: Object.fromEntries(formData.entries()),
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    state,
    isPending,
    images,
    setImages,
    menuPdf,
    setMenuPdf,
    handleSubmit,
  };
}
