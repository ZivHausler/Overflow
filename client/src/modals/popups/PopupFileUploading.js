import { useEffect, useState } from "react";
import Button from "../../general-components/Button";
import UploadFile from "../../general-components/UploadFile";
import GroupedDDLs from "../../components/grouped-ddls/GroupedDDLs";
import { createTest, createSolution, createExam } from "../../API/testApi";
import { uploadToS3 } from "../../s3-methods/uploadFile";
import { createQuestion } from "../../API/questionApi";
import { getAllTests } from "../../API/testApi";

const PopupFileUploading = ({
  examDefenition,
  setNewExamUploaded,
  newExamUploaded,
  newSolutionUploaded,
  setNewSolutionUploaded,
  setTitle,
  setIsPopupOpen,
  popupType,
  isLoading,
  setIsLoading,
}) => {
  let params = window.location.href.split("/").slice(3);
  let courseID, examID;
  if (params[0]) courseID = params[0].split("=")[1];
  if (params[1]) examID = params[1].split("=")[1];

  examID ? setTitle("העלה קובץ") : setTitle("צור מבחן");

  const findSemester = () => {
    let month = new Date().getMonth() + 1;
    switch (month) {
      case 11:
      case 12:
      case 1:
      case 2:
        return "א";
      case 3:
      case 4:
      case 5:
      case 6:
        return "ב";
      case 7:
      case 8:
      case 9:
      case 10:
        return "קיץ";
      default:
        break;
    }
  };

  // file upload data
  const [selectedFile, setSelectedFile] = useState(null);

  // ddls and inputs data
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [due, setDue] = useState(null);
  const [maestro, setMaestro] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [fileType, setFileType] = useState(null);
  const [grade, setGrade] = useState(null);
  const [language, setLanguage] = useState(null);
  const FILE_LIMIT = 5000000;

  useEffect(() => {
    setYear(examID ? examDefenition.year : new Date().getFullYear());
    setSemester(examID ? examDefenition.semester : findSemester());
    setDue(examID ? examDefenition.period : null);
  }, [examID]);

  const handleFileInput = (file) => {
    if (file.size > FILE_LIMIT) {
      alert("file uploading is limited up to 5MB");
      return;
    }
    setSelectedFile(file);
  };

  const createTests = async () => {
    // make sure all fields are filled
    if (!(year && semester && due && questionNum)) {
      alert("All fields must be filled");
      return;
    }

    // get all stored tests
    const tests = await getAllTests();
    for (const test of tests.data.data.allTests.nodes) {
      if (
        test.cid === courseID &&
        test.year === year &&
        test.period === due &&
        test.semester === semester
      ) {
        // alert and navigate to test page
        alert("המבחן כבר קיים, תועבר באופן אוטומטי");
        window.location.replace(`/course=${courseID.trim()}/exam=${test.id}`);
        return;
      }
    }

    // if isnt a match => continue and create
    const testID = await createTest({
      cid: courseID,
      year: parseInt(year),
      questionsNum: parseInt(questionNum),
      semester: semester,
      period: due,
    });
    for (let i = 1; i <= parseInt(questionNum); i++) {
      let question = await createQuestion({
        tid: parseInt(testID.data.data.createTest.test.id),
        qnum: i,
      });
    }
    if (testID.status === 200) {
      window.location.replace(
        `/course=${courseID.trim()}/exam=${testID.data.data.createTest.test.id}`
      );

      setIsPopupOpen(false);
    } else if (testID.status === 400) {
      alert("הקובץ לא הועלה כשורה. אנא נסה שוב.");
    }
  };

  const uploadFile = async () => {
    // make sure all fields are filled
    if (!(year && semester && due && courseID && selectedFile && fileType)) {
      alert("All fields must be filled");
      return;
    }
    setIsLoading(true);
    // push exam info with download link
    let response;
    // if type is solution or exam, this means a test is already created. Just upload the specific file
    if (parseInt(fileType) === 0) {
      response = await createSolution({
        cid: courseID,
        downloadLink: await uploadToS3(selectedFile, "solution"),
        tid: parseInt(examID),
        grade: parseInt(grade),
      });
      setNewSolutionUploaded(!newSolutionUploaded);
    } else if (parseInt(fileType) === 1) {
      response = await createExam({
        cid: courseID,
        downloadLink: await uploadToS3(selectedFile, "exam"),
        tid: parseInt(examID),
        language: language,
      });
      setNewExamUploaded(!newExamUploaded);
    }
    if (response.status === 200) {
      setIsPopupOpen(false);
    } else if (response.status === 400) {
      alert("הקובץ לא הועלה כשורה. אנא נסה שוב.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <GroupedDDLs
        examDefenition={examDefenition}
        grade={grade}
        questionNum={questionNum}
        isQuestionNum={examID}
        language={language}
        setLanguage={setLanguage}
        setGrade={setGrade}
        fileType={fileType}
        setFileType={setFileType}
        setYear={setYear}
        year={year}
        setSemester={setSemester}
        semester={semester}
        setDue={setDue}
        due={due}
        setMaestro={setMaestro}
        setQuestionNum={setQuestionNum}
        upload={true}
        popupType={popupType}
      />

      {!isLoading ? (
        <div className="select-none flex flex-col items-center justify-center">
          {examID && (
            <UploadFile
              uploadTitle={"העלה קובץ"}
              uploadFileLimit={FILE_LIMIT}
              uploadType={"PDF"}
              handleFileInput={handleFileInput}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
            />
          )}
          <Button
            text="אישור"
            clickHandler={examID ? uploadFile : createTests}
          />
        </div>
      ) : (
        <div className="select-none flex flex-col items-center justify-center">
          <p>יוצר טופס. אנא המתן.</p>
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
export default PopupFileUploading;
