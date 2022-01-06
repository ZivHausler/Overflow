import H3 from "../../general-components/H3";
import { ThumbUpIcon } from "@heroicons/react/outline";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XIcon,
} from "@heroicons/react/solid";
import TextArea from "../../general-components/TextArea";
import { useState, useEffect, useRef } from "react";
import { createCourseComment } from "../../API/commentApi";
import { createTestComment } from "../../API/commentApi";
import { getAllCourseDiscussionComments } from "../../API/courseApi";
import { getAllTestDiscussionsComments } from "../../API/testApi";
import Comments from "./Comments";
import { useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../../API/usersApi";
import { createQuestionComment } from "../../API/commentApi";
import { getAllQuestionDiscussionsComments } from "../../API/questionApi";
import { uploadToS3 } from "../../s3-methods/uploadFile";
import ReactTooltip from "react-tooltip";

const Discussion = ({ setSelectedDiscussion, selectedDiscussion, type }) => {
  const { user, isLoading } = useAuth0();
  const [description, setDescription] = useState("");
  const [commentsChanged, setCommentsChanged] = useState(false);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageDisplayed, setIsImageDisplayed] = useState(null);
  const onScreenClick = useRef(null);
  const [isPushLoading, setIsPushLoading] = useState(false);
  const IDs = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data.data.allUsers.nodes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const addAttachment = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setSelectedFile(file);
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
  };
  const pushComment = async () => {
    try {
      let response;
      if (description.trim() === "") return;
      setIsPushLoading(true);
      switch (type) {
        case "course":
          response = await createCourseComment({
            uid: user.sub.split("|")[1],
            cid: selectedDiscussion[0].cid.trim(),
            did: selectedDiscussion[0].id,
            body: description.trim(),
            attachment: previewUrl
              ? await uploadToS3(selectedFile, "image")
              : null,
          });
          break;

        case "exam":
          response = await createTestComment({
            uid: user.sub.split("|")[1],
            did: parseInt(selectedDiscussion[0].id),
            tid: parseInt(IDs.examID),
            cid: IDs.courseID,
            body: description.trim(),
            attachment: previewUrl
              ? await uploadToS3(selectedFile, "image")
              : null,
          });
          break;

        case "question":
          response = await createQuestionComment({
            uid: user.sub.split("|")[1],
            did: parseInt(selectedDiscussion[0].id),
            body: description.trim(),
            attachment: previewUrl
              ? await uploadToS3(selectedFile, "image")
              : null,
          });
          break;

        default:
          break;
      }

      if (response.status === 200 && !response.data.errors) {
        setDescription("");
        setSelectedFile(null);
        setPreviewUrl(null);
        setCommentsChanged(!commentsChanged);
        setIsPushLoading(false);
      } else if (response.status === 400) {
        setIsPushLoading(false);
        alert("לא הצלחתי להוסיף את התגובה שלך. אנא נסה שוב!");
      }
    } catch (error) {
      setIsPushLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        if (!selectedDiscussion) return;
        let response,
          currentComments = [];
        switch (type) {
          case "course":
            response = await getAllCourseDiscussionComments();
            currentComments = response.data.data.allCourseComments.nodes.filter(
              (a_comment) => a_comment.did === selectedDiscussion[0]?.id
            );
            break;
          case "exam":
            response = await getAllTestDiscussionsComments();
            currentComments = response.data.data.allTestComments.nodes.filter(
              (a_comment) =>
                a_comment?.did === selectedDiscussion[0]?.id &&
                parseInt(a_comment?.tid) === parseInt(IDs.examID)
            );
            break;
          case "question":
            response = await getAllQuestionDiscussionsComments();
            currentComments =
              response.data.data.allQuestionComments.nodes.filter(
                (a_comment) => a_comment?.did === selectedDiscussion[0]?.id
              );
            break;
          default:
            break;
        }
        setComments(currentComments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [commentsChanged, selectedDiscussion]);

  const checkUserName = (id) => {
    let userName;
    if (!isLoading) {
      users.forEach((user) => {
        if (user.id === id) userName = `${user.firstname}_${user.lastname}`;
      });
      return userName;
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        onScreenClick.current &&
        !onScreenClick.current.contains(event.target)
      ) {
        setIsImageDisplayed(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onScreenClick]);

  const dateToString = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div ref={onScreenClick}>
      {isImageDisplayed && (
        <div className="flex z-50  flex-col items-center w-screen h-screen fixed top-0 left-0 justify-center ">
          <img
            className="h-screen p-10 object-contain "
            src={isImageDisplayed}
            alt=""
          />
        </div>
      )}
      <div className="relative  dark:text-white w-full dark:bg-gray-900 dark:bg-opacity-20 ">
        <div className="dark:bg-transparent mb-3 py-3 px-5 rounded-t-xl bg-purple-50">
          <h3 className="text-xl font-bold">
            {selectedDiscussion[1] + ". " + selectedDiscussion[0].title}
          </h3>
          <p
            onClick={() => setSelectedDiscussion(null)}
            className="text-center absolute -top-3 text-white -left-3 w-8 h-8 bg-indigo-600 hover:bg-indigo-700 rounded-full text-xl cursor-pointer"
          >
            &times;
          </p>
          <div className=" flex flex-col justify-center ">
            <p className="text-right mt-3 break-words">
              {selectedDiscussion[0].body}
            </p>
            {selectedDiscussion[0].attachment && (
              <img
                className="object-contain rounded-xl cursor-pointer w-44 m-3 shadow"
                onClick={() =>
                  setIsImageDisplayed(selectedDiscussion[0].attachment)
                }
                src={selectedDiscussion[0].attachment}
              />
            )}
          </div>
          <div className="flex justify-around items-center mt-7">
            <p dir="ltr" className="text-sm font-semibold">
              @{checkUserName(selectedDiscussion[0].uid)}
            </p>
            <div className="flex items-center">
              <p className="mx-2 text-sm">
                {dateToString(selectedDiscussion[0].createdAt.split("T")[0])}
              </p>
              {/* <p className="mx-2 text-sm">{(new Date(selectedDiscussion[0].createdAt).toString().split("GMT")[0])}</p> */}
            </div>
          </div>
        </div>
        <Comments
          onScreenClick={onScreenClick}
          setIsImageDisplayed={setIsImageDisplayed}
          comments={comments}
        />
        <div className="mt-1 flex w-full px-2 items-center">
          <div className=" ">
            {!previewUrl ? (
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 "
              >
                <PaperClipIcon
                  data-tip
                  data-for="attachmentTip"
                  className="h-8 w-8  cursor-pointer text-indigo-600 hover:text-indigo-700"
                />
                <ReactTooltip
                  id="attachmentTip"
                  className="text-center"
                  place="bottom"
                  effect="solid"
                >
                  צרף תמונה
                </ReactTooltip>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => addAttachment(e)}
                />
              </label>
            ) : (
              <div className="relative flex justify-center items-center w-24 h-24">
                <img
                  className="object-contain shadow rounded-xl"
                  src={previewUrl}
                />
                <XIcon
                  className="absolute top-3 right-0 transform dark:text-gray-400 dark:bg-gray-800 translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-gray-200 text-indigo-600 hover:text-indigo-500 cursor-pointer border-dashed border-2 border-gray-400 rounded-full p-1"
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                />
              </div>
            )}
          </div>
          <TextArea
            text={"נו תגיב משהו:"}
            description={description}
            setDescription={setDescription}
            rows={2}
          />
          <div className="">
            {!isPushLoading ? (
              <PaperAirplaneIcon
                className="h-9 w-9 cursor-pointer transform -rotate-90 text-indigo-600 hover:text-indigo-700"
                onClick={() => pushComment()}
              />
            ) : (
              <svg
                className={`animate-spin w-7 h-7 text-indigo-700`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Discussion;
