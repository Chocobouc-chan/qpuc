import { Question } from "@prisma/client";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

export default function QuestionsList({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div>
      <ul className="list-decimal list-inside w-full">
        {questions.map((question) => {
          return (
            <li key={question.id}>
              {question.question}
              <button>
                <LuPencil size={15} className="ml-2" />
              </button>
              <button>
                <FaRegTrashAlt size={15} className="ml-2" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
