"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BusinessFormState,
  BusinessInterface,
} from "@/interfaces/places.interface";
import { saveBusinessListing } from "@/lib/api/saveBusinessListing";
import { useMessages } from "./useMessages";

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
  const messages = useMessages();
  const [isPending, setIsPending] = useState(false);
  const [images, setImages] = useState<File[]>(initialValues.images || []);
  const [menuPdf, setMenuPdf] = useState<File | null>(
    initialValues.menu_pdf || null
  );
  const [documentPdf, setDocumentPdf] = useState<File | null>(
    initialValues.document_pdf || null
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
        phone: (formData.get("phone") as string) || "",
        identification_code:
          (formData.get("identification_code") as string) || "",
        working_schedule:
          (formData.get("working_schedule") as string) || JSON.stringify({}),

        images,
        menu_pdf: menuPdf,
        document_pdf: documentPdf,
        vip_plan: formData.get("vip_plan") as string | "",
        is_vip: formData.get("is_vip") === "true" ? true : false,
      };

      const res = await saveBusinessListing({ id, locale, method, data });

      console.log(res);

      if (res?.checkout_url) {
        window.location.href = res.checkout_url;
      }

      if (!res) {
        setState({
          success: false,
          message: messages.error_message,
          fieldErrors: {},
          values: Object.fromEntries(formData.entries()),
        });
        setIsPending(false);
        return;
      }

      if (!res.success) {
        setState({
          success: false,
          message: res.message || messages.error_message,
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
    setDocumentPdf,
    setMenuPdf,
    handleSubmit,
  };
}
