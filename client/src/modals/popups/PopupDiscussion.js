import { useState, useEffect } from "react";
import Input from "../../general-components/Input";
import Button from "../../general-components/Button";
import TextArea from "../../general-components/TextArea";
import { createCourseDiscussion } from "../../API/discussionApi";
import { createTestDiscussion } from "../../API/discussionApi";
import { createQuestionDiscussion } from "../../API/questionApi";
import userEvent from "@testing-library/user-event";
import { useAuth0 } from "@auth0/auth0-react";
import UploadFile from "../../general-components/UploadFile";
import { uploadToS3 } from "../../s3-methods/uploadFile";

const PopupDiscussion = ({
  setTitle,
  setIsPopupOpen,
  setContentUpdated,
  contentUpdated,
  isLoading,
  setIsLoading,
}) => {
  const { user } = useAuth0();

  let params = window.location.href.split("/").slice(3);
  let courseID, examID, questionNum;

  if (params[0]) courseID = params[0].split("=")[1];
  if (params[1]) examID = params[1].split("=")[1];
  if (params[2]) questionNum = params[2].split("=")[1];

  const [inputTitle, setInputTitle] = useState("");
  const [description, setDescription] = useState("");

  // file uploading code
  const FILE_LIMIT = 500000;
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (file) => {
    if (file.size > 5000000) {
      alert("file uploading is limited up to 5MB");
      return;
    }
    setSelectedFile(file);
  };

  setTitle("צור דיון חדש");

  const postDiscussion = async (e) => {
    setIsLoading(true);
    // check if there is a attachment && upload it to S3
    let attachment = "";
    if (selectedFile) {
      attachment = await uploadToS3(selectedFile, "image");
    }
    // setIsBTNdisabled(true);
    // if the title is empty, don't let the user commit the discussion!
    if (inputTitle.trim().length <= 0) {
      alert("Discussion must have a title");
      return;
    }

    // check what type of discussion the user wants to post {course, exam, question}
    let response;
    if (questionNum) {
      let object = {
        attachment: attachment ? attachment : null,
        body: description.trim(),
        qnum: parseInt(questionNum),
        tid: parseInt(examID),
        title: inputTitle.trim(),
        uid: user.sub.split("|")[1],
      };
      response = await createQuestionDiscussion(object);
    } else if (examID) {
      response = await createTestDiscussion({
        uid: user.sub.split("|")[1],
        cid: courseID,
        tid: parseInt(examID),
        title: inputTitle.trim(),
        body: description.trim(),
        attachment: attachment ? attachment : null,
      });
    } else {
      response = await createCourseDiscussion({
        uid: user.sub.split("|")[1],
        cid: courseID,
        title: inputTitle.trim(),
        body: description.trim(),
        attachment: attachment ? attachment : null,
      });
    }
    if (response.status === 200) {
      setIsLoading(false);
      setIsPopupOpen(false);
      setContentUpdated(!contentUpdated);
    } else {
      setIsLoading(false);
      alert("קרתה תקלה. אנא נסה בשנית");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between items-center flex-col ">
      <div className="w-full">
        <Input setInputValue={setInputTitle} text={"כותרת"} type={"text"} />
      </div>
      <TextArea setDescription={setDescription} text={"תיאור"} rows={6} />
      {!isLoading ? (
        <div className="select-none flex flex-col items-center">
          <UploadFile
            uploadTitle={"צרף תמונה"}
            uploadFileLimit={FILE_LIMIT}
            uploadType={"PNG"}
            handleFileInput={handleFileInput}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
          <Button clickHandler={postDiscussion} text={"אישור"} />
        </div>
      ) : (
        <div className="select-none flex flex-col items-center justify-center">
          <p>יוצר דיון. אנא המתן.</p>
          <svg
            className={`animate-spin w-10 h-10 text-indigo-700`}
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
        </div>
      )}
    </div>
  );
};
export default PopupDiscussion;
