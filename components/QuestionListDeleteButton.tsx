"use client";

import { deleteQuestion } from "@/lib/prismaData";
import { Question } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function QuestionsListDeleteButton({
  question,
}: {
  question: Question;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleClick() {
    setShowModal(true);
  }

  function handleClickModal() {
    setShowModal(false);
  }

  // TODO extract modal in own component
  function ModalContent() {
    const t = useTranslations("admin.question.modal");
    const initialState = {
      message: "",
      error: "",
    };

    const [state, formAction, pending] = useActionState(
      deleteQuestion.bind(null, question.id, question.quizId),
      initialState
    );

    useEffect(() => {
      if (pending && state.message === "OK") {
        setShowModal(false);
      }
    }, [state, pending]);

    return (
      <div
        className="flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full md:inset-0 z-10 justify-center items-center w-screen h-screen bg-black bg-opacity-25"
        onClick={handleClickModal}
      >
        <div className="flex flex-col w-full max-w-md px-4 h-full md:h-auto bg-white rounded-lg shadow dark:bg-gray-700 p-5">
          <p>{t("are_you_sure_about_that")}</p>
          <span>{`${question.question}`}</span>
          <div className="flex justify-center gap-7 pt-5">
            <form action={formAction}>
              <button
                className="btn-primary"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {t("yes_button")}
              </button>
            </form>
            <button
              className="btn-secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleClickModal();
              }}
            >
              {t("no_button")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button onClick={handleClick}>
        <FaRegTrashAlt size={20} className="ml-4" color="red" />
      </button>
      {showModal && createPortal(<ModalContent />, document.body)}
    </>
  );
}
