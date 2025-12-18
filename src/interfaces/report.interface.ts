export interface ReportInterface {
  title: string;
  description: string;
}

export interface ReportFormState {
  message: unknown;
  success: boolean;
}

export interface ReportResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fieldErrors?: Record<string, string | string[]>;
  values?: ReportInterface;
}
