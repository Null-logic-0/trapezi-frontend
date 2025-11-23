"use client";

import { FaRegFlag } from "react-icons/fa6";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useMessages } from "@/hooks/useMessages";
import { useUIContext } from "@/store/ui-context";
import Input from "../UI/Input";
import { ReportFormState } from "@/interfaces/report.interface";
import { sendReport } from "@/lib/actions/sendReport";
import { useLanguage } from "@/store/language-context";
import toast from "react-hot-toast";
import { useActionState } from "react";

function CreateReport({ id }: { id: number }) {
  const messages = useMessages();
  const { locale } = useLanguage();
  const { handleOpenModal, handleCloseModal } = useUIContext();

  const handleAction = async (
    prevState: ReportFormState,
    formData: FormData
  ) => {
    const result = await sendReport(prevState, formData, id, locale);

    if (result.success) {
      toast.success(messages.report_send_success);
      handleCloseModal();
    } else {
      toast.error(messages.error_message);
    }

    return result;
  };

  const [state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      title: "",
      description: "",
    },
  });

  return (
    <>
      <button
        onClick={() => handleOpenModal("report_modal")}
        className="cursor-pointer text-lg text-[#666666]"
      >
        <FaRegFlag />
      </button>

      <Modal modalId="report_modal">
        <h1 className="text-center text-3xl text-gray-800 font-semibold">
          {messages.send_report}
        </h1>
        <hr className="border-gray-300" />
        <form className="text-start space-y-4" action={formAction}>
          <Input
            type="text"
            label={messages.title}
            placeholder={messages.subject_placeholder}
            name="title"
            error={state.fieldErrors?.title}
          />
          <Input
            isTextArea
            name="description"
            label={messages.message}
            className="resize-y"
            error={state.fieldErrors?.description}
          />

          <div className="flex mt-6 justify-center items-center gap-4">
            <Button
              onClick={handleCloseModal}
              type="button"
              isDisabled={isPending}
              buttonType="outline"
            >
              {messages.cancel}
            </Button>
            <Button
              type="submit"
              buttonType="fill"
              isDisabled={isPending}
              isPending={isPending}
            >
              {isPending ? messages.sending : messages.send}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CreateReport;
