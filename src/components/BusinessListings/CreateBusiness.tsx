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

function CreateBusiness() {
  const { locale } = useLanguage();
  const router = useRouter();
  const messages = useMessages();
  const categories = SELECT_CATEGORIES(messages);

  const { state, isPending, setImages, setMenuPdf, handleSubmit } =
    useBusinessForm({ locale: locale, onSuccessRedirect: "/my-places" });

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center py-24">
      <form
        onSubmit={(e) => handleSubmit(e, "POST")}
        className="bg-[#ffffff] flex flex-col gap-6 w-full border-[#e3e3e3] border px-8 py-6 rounded-xl"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold pb-2">{messages.add_business}</h1>

        <Input
          type="text"
          name="business_name"
          error={state.fieldErrors?.business_name}
          placeholder={messages.enter_business_name}
          label={messages.business_name}
        />

        <Input
          isTextArea
          name="description"
          error={state.fieldErrors?.description}
          placeholder={messages.description_business}
          label={messages.description}
          className="h-[200px]"
        />

        <GoogleMapInput
          name="address"
          error={state.fieldErrors?.address}
          label={messages.address}
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
          />
        </label>

        {/* Multi Image Picker */}
        <MultiImagePicker
          name="images[]"
          maxImages={5}
          onChange={setImages}
          error={state.fieldErrors?.images}
        />

        {/* Single PDF Uploader */}
        <SinglePdfUploader
          name="menu_pdf"
          onChange={setMenuPdf}
          label={messages.upload_menu}
          error={state.fieldErrors?.menu_pdf}
        />

        <AddLinks />

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

export default CreateBusiness;
