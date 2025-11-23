import { ReportInterface } from "@/interfaces/report.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function createReport(
  id: number,
  data: ReportInterface,
  locale: "ka" | "en"
) {
  try {
    const { token, success } = await getCookies();
    if (!success || !token) return {};

    const res = await fetch(`${ENDPOINTS.places.create_report}/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    const fieldErrors: Record<string, string> = {};
    if (body.errors) {
      for (const key in body.errors) {
        const val = body.errors[key];
        fieldErrors[key] = Array.isArray(val) ? val[0] : val;
      }
    }

    return {
      success: res.ok,
      message: body.message || body.error || "Request failed",
      fieldErrors,
      values: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      values: data,
      fieldErrors: {},
    };
  }
}
