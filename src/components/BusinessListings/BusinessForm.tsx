"use client";
import Button from "../UI/Button";
import Input from "../UI/Input";
import AddLinks from "./AddLinks";
import { useRouter } from "next/navigation";
import MultiSelectDropdown from "../UI/MultiSelectDropdown";
import { useMessages } from "@/hooks/useMessages";
import { SELECT_CATEGORIES } from "@/helpers/categories";
import MultiImagePicker from "../UI/MultiImagePicker";
import SinglePdfUploader from "../UI/PdfUploader";
import GoogleMapInput from "../UI/GoogleMapInput";
import { GOOGLE_API_KEY } from "@/constants/google-api-key";
import { useLanguage } from "@/store/language-context";
import { useBusinessForm } from "@/hooks/useBusinessForm";
import { BusinessInterface } from "@/interfaces/places.interface";
import WorkingScheduleInput from "../UI/WorkingScheduleInput";
import toast from "react-hot-toast";

type Props = {
  initialValues?: BusinessInterface;
  onSuccessRedirect?: string;
};

type CategoryMessages = {
  restaurant?: string;
  cafe?: string;
  bar?: string;
  bakery?: string;
  pastry?: string;
};

function BusinessForm({
  initialValues,
  onSuccessRedirect = "/my-places",
}: Props) {
  const { locale } = useLanguage();
  const router = useRouter();
  const messages = useMessages();
  const categories = SELECT_CATEGORIES(messages as CategoryMessages);

  const {
    state,
    isPending,
    setImages,
    setMenuPdf,
    setDocumentPdf,
    handleSubmit,
  } = useBusinessForm({ locale, initialValues, onSuccessRedirect });

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center py-24">
      <form
        onSubmit={(e) => {
          const errorFields = ["plan", "nsfw"];

          let hasErrors = false;

          errorFields.forEach((field) => {
            if (state.fieldErrors?.[field]) {
              toast.error(state.fieldErrors[field]);
              hasErrors = true;
            }
          });

          if (hasErrors) return;
          handleSubmit(
            e,
            initialValues?.id ? "PATCH" : "POST",
            initialValues?.id
          );
        }}
        className="bg-[#ffffff] flex flex-col gap-6 w-full border-[#e3e3e3] border px-8 py-6 rounded-xl"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold pb-2">
          {initialValues?.id ? messages.update_business : messages.add_business}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            type="text"
            className=""
            name="business_name"
            error={state.fieldErrors?.business_name}
            placeholder={messages.enter_business_name}
            label={messages.business_name}
            defaultValue={initialValues?.business_name || ""}
          />

          <Input
            type="text"
            name="identification_code"
            error={state.fieldErrors?.identification_code}
            placeholder={messages.enter_identification_code}
            label={messages.identification_code}
            defaultValue={initialValues?.identification_code || ""}
          />
        </div>

        <SinglePdfUploader
          name="document_pdf"
          onChange={setDocumentPdf}
          label={messages.upload_document}
          defaultFileUrl={initialValues?.document_url}
          error={state.fieldErrors?.document_pdf}
        />

        <Input
          isTextArea
          name="description"
          error={state.fieldErrors?.description}
          placeholder={messages.description_business}
          defaultValue={initialValues?.description || ""}
          label={messages.description}
          className="h-[200px]"
        />

        <GoogleMapInput
          name="address"
          error={state.fieldErrors?.address}
          label={messages.address}
          defaultValue={initialValues?.address || ""}
          placeholder={messages.enter_address}
          apiKey={GOOGLE_API_KEY}
        />

        <label className="text-sm font-semibold flex flex-col gap-2">
          {messages.category}
          <MultiSelectDropdown
            name="categories[]"
            placeholder={messages.select_categories}
            error={state.fieldErrors?.categories}
            options={categories}
            defaultSelected={initialValues?.categories || []}
          />
        </label>

        <Input
          type="text"
          error={state.fieldErrors?.phone}
          name="phone"
          label={messages.phone}
          placeholder="+995598123456"
          defaultValue={initialValues?.phone}
        />

        <WorkingScheduleInput
          name="working_schedule"
          defaultValue={initialValues?.working_schedule}
          error={state.fieldErrors?.working_schedule}
        />

        {/* Multi Image Picker */}
        <MultiImagePicker
          name="images[]"
          maxImages={5}
          defaultImages={initialValues?.images_url || []}
          onChange={setImages}
          error={state.fieldErrors?.images}
        />

        <SinglePdfUploader
          name="menu_pdf"
          onChange={setMenuPdf}
          label={messages.upload_menu}
          defaultFileUrl={initialValues?.menu_url}
          error={state.fieldErrors?.menu_pdf}
        />

        <AddLinks defaultValues={initialValues} />

        <div className="flex justify-center items-center gap-4">
          <Button
            type="button"
            onClick={() => router.back()}
            buttonType="outline"
            className="text-sm"
          >
            {messages.cancel}
          </Button>
          <Button
            type="submit"
            isDisabled={isPending}
            isPending={isPending}
            className="text-sm"
          >
            {isPending ? messages.saving : messages.save}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BusinessForm;
