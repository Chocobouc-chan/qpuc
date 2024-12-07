"use client";
import { Question } from "@prisma/client";
import { LuPencil } from "react-icons/lu";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTranslations } from "next-intl";
import QuestionsListDeleteButton from "./QuestionListDeleteButton";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export default function QuestionsList({
  questions,
  onEdit,
}: {
  questions: Question[];
  onEdit: (id: string) => void;
}) {
  const t = useTranslations("admin.quiz.table");
  const THEME = {
    Table: `
    --data-table-library_grid-template-columns:  50% 10% 10% 20% 10%;
    color: black;
    background-color: transparent;`,
    Row: `color: white; background-color: transparent;`,
    Cell: `padding:2px; border: 1px solid white;  border-top-width:0px`,
    HeaderCell: `padding:2px; border: 1px solid white;`,
    HeaderRow: `background-color: transparent; color:white; `,
  };
  const sort = useSort(
    { nodes: questions },
    {},
    {
      sortFns: {
        QUESTION: (questionList) =>
          questionList.sort((a, b) => a.question.localeCompare(b.question)),
        QUESTION_TYPE: (questionList) =>
          questionList.sort((a, b) =>
            a.question_type.localeCompare(b.question_type)
          ),
        POINTS: (questionList) =>
          questionList.sort((a, b) => a.points - b.points),
        AUTHOR: (questionList) =>
          questionList.sort((a, b) => a.author.localeCompare(b.author)),
      },
    }
  );

  const sortIconsOptions = {
    iconDefault: <FaSort />,
    iconUp: <FaSortUp />,
    iconDown: <FaSortDown />,
  };

  return (
    <div>
      <Table
        data={{ nodes: questions }}
        theme={THEME}
        sort={sort}
        layout={{ custom: true }}
      >
        {(tableList: Question[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort
                  resize
                  sortKey="QUESTION"
                  sortIcon={sortIconsOptions}
                >
                  {t("question")}
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="QUESTION_TYPE"
                  sortIcon={sortIconsOptions}
                >
                  {t("question_type")}
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="POINTS"
                  sortIcon={sortIconsOptions}
                >
                  {t("points")}
                </HeaderCellSort>
                <HeaderCellSort
                  resize
                  sortKey="AUTHOR"
                  sortIcon={sortIconsOptions}
                >
                  {t("author")}
                </HeaderCellSort>
                <HeaderCell stiff />
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item: Question) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.question}</Cell>
                  <Cell>{item.question_type}</Cell>
                  <Cell>{item.points}</Cell>
                  <Cell>{item.author}</Cell>
                  <Cell stiff>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button onClick={() => onEdit(item.id)}>
                        <LuPencil size={20} color="#eab308" />
                      </button>
                      <QuestionsListDeleteButton question={item} />
                    </div>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
}
