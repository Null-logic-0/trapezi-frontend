import { BusinessInterface } from "@/interfaces/places.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

type Locale = "ka" | "en";
type Method = "POST" | "PATCH";

interface SaveBusinessListingOptions {
  id?: number;
  locale: Locale;
  method?: Method;
  data: BusinessInterface;
}

export async function saveBusinessListing({
  id,
  locale,
  method = "POST",
  data,
}: SaveBusinessListingOptions) {
  try {
    const { token, success } = await getCookies();
    if (!success || !token) return;

    const {
      business_name,
      description,
      working_schedule,
      identification_code,
      document_pdf,
      address,
      phone,
      categories,
      images,
      menu_pdf,
      instagram,
      website,
      tiktok,
      facebook,
      is_vip,
      vip_plan,
    } = data;

    const formData = new FormData();

    formData.append("business_name", business_name);
    formData.append("description", description);
    formData.append(
      "working_schedule",
      typeof working_schedule === "string"
        ? working_schedule
        : JSON.stringify(working_schedule || {})
    );
    formData.append("address", address);
    formData.append("is_vip", is_vip ? "true" : "false");
    formData.append("vip_plan", vip_plan);
    formData.append("phone", phone || "");
    formData.append("identification_code", identification_code || "");
    formData.append("website", website);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("tiktok", tiktok);

    categories.forEach((cat) => formData.append("categories[]", cat));

    images.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        formData.append("images[]", file);
      }
    });

    const files = { menu_pdf, document_pdf };

    Object.entries(files).forEach(([key, file]) => {
      if (file && file instanceof File && file.size > 0) {
        formData.append(key, file);
      }
    });

    const endpoint =
      method === "PATCH"
        ? `${ENDPOINTS.user.update_place}/${id}`
        : ENDPOINTS.user.create_place;

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": locale,
      },
      body: formData,
    });

    const body = await res.json();

    return {
      success: body.success ?? res.ok,
      checkout_url: body.checkout_url,
      message:
        body.message ??
        (method === "PATCH"
          ? "Business listing updated successfully"
          : "Business listing created successfully"),
      errors: body.errors || null,
    };
  } catch (error) {
    console.error("Save Business Listing Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving your business listing.",
    };
  }
}
