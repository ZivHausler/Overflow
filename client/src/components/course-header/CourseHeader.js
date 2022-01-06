import H2 from "../../general-components/H2";
import H4 from "../../general-components/H4";
import Button from "../../general-components/Button";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAllUserCourses,
  deleteUserCourse,
  createUserCourse,
} from "../../API/usersApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TrashIcon, FolderAddIcon, StarIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import DropDownList from "../../general-components/DropDownList";
import { updateQuestionUserRate } from "../../API/questionApi";

const CourseHeader = ({
  avgVote,
  hasUserVoted,
  userRate,
  setUserRate,
  setIsListUpdated,
  isListUpdated,
  addToFav,
  setPopupType,
  isPopupOpen,
  setIsPopupOpen,
  courseName,
  examID,
  questionNum,
  discussionBTN,
  filesUploadBTN,
}) => {
  const { user, isLoading } = useAuth0();
  const [userCourses, setUserCourses] = useState([]);
  const [doesInclude, setDoesInclude] = useState(false);
  const [changeQuestionRating, setChangeQuestionRating] = useState(false);
  const IDs = useParams();

  // console.log('questionNum', questionNum, 'avgVote', avgVote, 'userRate', userRate)

  const updateQuestionRating = async (rating) => {
    setChangeQuestionRating(false);
    const response = await updateQuestionUserRate({
      qnum: parseInt(questionNum),
      tid: parseInt(IDs.examID),
      uid: user.sub.split("|")[1].toString(),
      personalRate: rating,
    });
    setUserRate(rating);
    // update avarage difficulty
  };

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) {
          if (user) {
            const response = await getAllUserCourses();
            const allUserCourses = response?.data?.data?.allUserCourses?.nodes;
            setUserCourses(
              allUserCourses.filter(
                (course) => course.uid === user.sub.split("|")[1]
              )
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLoading]);

  useEffect(() => {
    for (let course of userCourses) {
      if (course.cid === IDs.courseID) {
        setDoesInclude(true);
        return;
      }
    }
    setDoesInclude(false);
  }, [userCourses]);

  const editCourseList = async (type) => {
    // add object to the list and check if it has more than 10 inside of it
    if (type === "add") {
      const response = await getAllUserCourses();
      if (
        response.data.data.allUserCourses.nodes.filter(
          (course) => course.uid === user.sub.split("|")[1]
        ).length >= 10
      ) {
        alert("הגעת למקסימום הקורסים שניתן לעקוב אחריהם");
        return;
      } else {
        const response = await createUserCourse({
          uid: user.sub.split("|")[1],
          cid: IDs.courseID,
        });
        if (response.status === 200) alert("קורס זה נוסף בהצלחה!");
      }
    }
    // remove object from the list
    else {
      const response = await deleteUserCourse({
        uid: user.sub.split("|")[1],
        cid: IDs.courseID,
      });
      if (response.status === 200 && !response.data.error)
        alert("קורס זה נמחק בהצלחה!");
    }
    // this way or another, fetch the new table to refresh the web
    const response = await getAllUserCourses();
    setUserCourses(
      response.data.data.allUserCourses.nodes.filter(
        (course) => course.uid === user.sub.split("|")[1]
      )
    );
    setIsListUpdated(!isListUpdated);
  };

  return (
    <div className="flex flex-col w-full sm:flex-row items-center justify-between mb-5 border-b py-2 dark:border-gray-600 pr-3">
      {/* course, exam, question info */}
      <div className=" text-indigo-600 text-right flex flex-col items-start">
        {courseName && <H2 text={"שם הקורס: " + courseName} className="" />}
        {examID && (
          <H2
            text={`שנה: ${examID.year}, סמסטר: ${examID.semester}, מועד: ${examID.period}`}
          />
        )}
        {questionNum && <H2 text={"מספר שאלה: " + questionNum} />}
        {questionNum && parseInt(userRate) > 0 && (
          <div
            onClick={() => {
              setChangeQuestionRating(!changeQuestionRating);
            }}
            className={`select-none flex relative justify-center items-center pb-1 rounded-md cursor-pointer `}
          >
            <p
              className={`-mr-2 px-2 text-2xl font-bold rounded-lg dark:text-white ${
                changeQuestionRating
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-600"
              }`}
            >
              רמת הקושי שבחרת: {parseInt(userRate)}
            </p>
            <div>
              {changeQuestionRating && (
                <ul className="bg-indigo-600 w-full text-white absolute left-0 top-9 rounded-lg z-10">
                  {[...Array(5)].map((el, index) => (
                    <li
                      key={index}
                      onClick={() => updateQuestionRating(index + 1)}
                      className={`px-4 my-1 text-center hover:bg-indigo-400 cursor-pointer rounded-md ${
                        parseInt(userRate) === index + 1
                          ? "text-xl font-bold bg-indigo-500"
                          : "null"
                      }`}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      {/* question rating */}

      {/* buttons info */}
      <div className="flex my-2">
        {!hasUserVoted && IDs.questionID && (
          <div className="flex my-2 flex-col items-center justify-center  px-1 rounded-xl ">
            <div className="flex justify-center items-center">
              <DropDownList
                noTitle={true}
                text={"רמת קושי"}
                object={userRate}
                setObject={setUserRate}
                list={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>
        )}
        {addToFav && (
          <div className="flex items-center justify-center">
            {doesInclude && (
              <TrashIcon
                data-tip
                data-for="included"
                className="w-7 h-7 mx-4 text-indigo-700"
                onClick={() => editCourseList("remove")}
              />
            )}
            {!doesInclude && (
              <FolderAddIcon
                data-tip
                data-for="excluded"
                className="w-7 h-7 mx-4 text-indigo-700"
                onClick={() => editCourseList("add")}
              />
            )}
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center justify-start">
          {hasUserVoted && IDs.questionID && (
            <div className="flex flex-col items-center justify-center bg-indigo-600 py-2 rounded-lg px-3">
              {questionNum && avgVote !== NaN && avgVote !== 0 && (
                <p className="text-white font-semibold">{`רמת קושי ממוצעת: ${avgVote}`}</p>
              )}
            </div>
          )}
          {discussionBTN && (
            <Button
              text={discussionBTN}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              setPopupType={setPopupType}
              type={"discussion"}
            />
          )}
          {filesUploadBTN && (
            <Button
              text={filesUploadBTN}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              setPopupType={setPopupType}
              type={"file"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CourseHeader;
