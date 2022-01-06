import CourseHeader from "../../components/course-header/CourseHeader"
import QuestionSelector from "../../components/question-selector/QuestionSelector"
import H4 from "../../general-components/H4"
import { DocumentTextIcon } from '@heroicons/react/solid'
import { getAllTests, getAllExams, getAllSolutions } from "../../API/testApi";
import { getAllCourses } from '../../API/courseApi'
import { useParams } from "react-router"
import { useState, useEffect } from "react"
import Discussions from "../../components/discussions/Discussions"

const ExamPage = ({ examDefenition, setExamDefenition, newExamUploaded, newSolutionUploaded, setIsPopupOpen, isPopupOpen, setPopupType, contentUpdated }) => {

    const [courseName, setCourseName] = useState('');
    const [questionsNum, setQuestionsNum] = useState(0);
    const [questionSelected, setQuestionSelected] = useState(-1);
    const [allExams, setAllExams] = useState([]);
    const [currentTest, setCurrentTest] = useState(null);
    const [allSolutions, setAllSolutions] = useState([]);
    const IDs = useParams();

    const updateSolutions = async () => {
        const solutions = await getAllSolutions();
        let correctSolutions = solutions.data.data.allSolutions.nodes.filter(solution =>
            solution.tid == IDs.examID);
        setAllSolutions(correctSolutions);
    }
    const updateExams = async () => {
        const exams = await getAllExams();
        let correctExams = exams.data.data.allExams.nodes.filter(exam =>
            exam.tid == IDs.examID);
        setAllExams(correctExams);
    }

    useEffect(() => {
        updateExams();
    }, [newExamUploaded])

    useEffect(() => {
        updateSolutions();
    }, [newSolutionUploaded])

    useEffect(() => {
        (async () => {
            try {
                updateExams();
                updateSolutions();
                const response = await getAllCourses();
                const allCourses = response?.data?.data?.allCourses?.nodes;
                allCourses.forEach(course => {
                    if (course.id === IDs.courseID) {
                        setCourseName(course.name);
                    }
                });
                const tests = await getAllTests();
                tests.data.data.allTests.nodes.forEach(test => {
                    if (test.cid.trim() === IDs.courseID && parseInt(test.id) === parseInt(IDs.examID)) {
                        setCurrentTest(test);
                        setExamDefenition({
                            "year": test.year,
                            "period": test.period,
                            "semester": test.semester
                        })
                        setQuestionsNum(test.questionsNum);
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        })();
    }, [])

    return (
        <>
            <div dir='rtl' className="flex shadow rounded-lg p-5 flex-col dark:bg-gray-900 mx-auto my-10 items-center max-w-7xl">
                <div className="w-full">
                    <CourseHeader setPopupType={setPopupType} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} courseName={courseName} examID={examDefenition} discussionBTN={'דיון חדש'} filesUploadBTN={'העלה טופס'} />
                    <div className="flex justify-around items-center">
                        <div className="flex mr-5 dark:text-white">
                            <div className="my-2 mx-5 ">
                                <div>
                                    {allExams.length == 0 ? <H4 text={'אין מבחנים לתצוגה'} /> : <H4 text={'טופס המבחן'} />}
                                </div>
                                <div className="max-h-xxs px-2 scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 pl-5 overflow-y-auto rounded-xl">
                                    {allExams.map((exam, index) => {
                                        return (
                                            <a key={index} href={exam.downloadLink} target="_blank">
                                                <div className="flex items-center bg-gray-100 dark:bg-gray-500 rounded-full my-2 py-1 hover:bg-gray-200 transition ease-in-out px-3 justify-center shadow">
                                                    <DocumentTextIcon className="cursor-pointer h-7 w-7 text-indigo-600 hover:text-indigo-700" aria-hidden="true" />
                                                    <p className="dark:text-black">נוסח ב{exam.language}</p>
                                                </div>
                                            </a>)
                                    })}
                                </div>
                            </div>
                            <div className="my-2 mx-5 ">
                                <div>
                                    {allSolutions.length == 0 ? <H4 text={'אין פתרונות לתצוגה'} /> : <H4 text={'פתרונות'} />}
                                </div>
                                <div className="max-h-xxs px-2 scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 pl-5 overflow-y-auto rounded-xl">
                                    {allSolutions.map((solution, index) => {
                                        return (
                                            <a key={index} href={solution.downloadLink} target="_blank">
                                                <div className="flex items-center bg-gray-100 dark:bg-gray-500 rounded-full my-2 py-1 hover:bg-gray-200 transition ease-in-out px-3 justify-center shadow">
                                                    <DocumentTextIcon className="cursor-pointer h-7 w-7 text-indigo-600 hover:text-indigo-700" aria-hidden="true" />
                                                    <p className="dark:text-black">{index + 1}. ציון - {solution.grade}</p>
                                                </div>
                                            </a>)
                                    })}
                                </div>
                            </div>
                        </div>
                        <QuestionSelector questionsNum={questionsNum} questionSelected={questionSelected} setQuestionSelected={setQuestionSelected} />
                    </div>
                    <Discussions type={'exam'} contentUpdated={contentUpdated} />
                </div>
            </div>
        </>
    )
}
export default ExamPage