"use server";

import {
  ReportFormState,
  ReportInterface,
  ReportResponse,
} from "@/interfaces/report.interface";
import { createReport } from "../api/createReport";

export async function sendReport(
  _prevState: ReportFormState,
  formData: FormData,
  id: number,
  locale: "ka" | "en" = "ka"
) {
  const body: ReportInterface = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  const res: ReportResponse = await createReport(id, body, locale);

  if (!res || !res.success) {
    const fieldErrors: Record<string, string> = {};

    if (res?.fieldErrors) {
      for (const key in res.fieldErrors) {
        const val = res.fieldErrors[key];
        fieldErrors[key] = Array.isArray(val) ? val[0] : val;
      }
    }

    return {
      success: false,
      message: res?.message || "error occurred",
      fieldErrors,
      values: body,
    };
  }

  return { success: true, message: "Report Sent", values: body };
}
