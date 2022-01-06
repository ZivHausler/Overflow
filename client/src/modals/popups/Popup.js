import { useState } from "react";
import H3 from "../../general-components/H3";
import PopupDiscussion from "./PopupDiscussion";
import PopupFileUploading from "./PopupFileUploading";
import { useParams } from "react-router";

const Popup = ({
  examDefenition,
  newExamUploaded,
  setNewExamUploaded,
  newSolutionUploaded,
  setNewSolutionUploaded,
  popupType,
  setIsPopupOpen,
  setContentUpdated,
  contentUpdated,
}) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const renderPopup = () => {
    switch (popupType) {
      case "discussion":
        return (
          <PopupDiscussion
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsPopupOpen={setIsPopupOpen}
            contentUpdated={contentUpdated}
            setContentUpdated={setContentUpdated}
            setTitle={setTitle}
          />
        );
      case "exam":
      case "solution":
        return (
          <PopupFileUploading
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            examDefenition={examDefenition}
            newExamUploaded={newExamUploaded}
            setNewExamUploaded={setNewExamUploaded}
            newSolutionUploaded={newSolutionUploaded}
            setNewSolutionUploaded={setNewSolutionUploaded}
            setIsPopupOpen={setIsPopupOpen}
            setTitle={setTitle}
            popupType={popupType}
          />
        );
      default:
        return "";
    }
  };
  return (
    <div
      dir="rtl"
      className="p-5 dark:bg-gray-700 shadow-7xl rounded-xl transform -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 min-w-3/5 min-h-1/3 shadow-3xl bg-gray-200 z-10"
    >
      <div className="mb-3 relative flex justify-center">
        <H3 text={title} />
        {!isLoading && (
          <p
            className="absolute left-0 -top-3 dark:text-white m-1 text-2xl cursor-pointer"
            onClick={() => setIsPopupOpen(false)}
          >
            &times;
          </p>
        )}
      </div>
      {renderPopup()}
    </div>
  );
};
export default Popup;
