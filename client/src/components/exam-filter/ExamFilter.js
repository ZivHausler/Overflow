import H2 from "../../general-components/H2"
import Button from "../../general-components/Button"
import GroupedDDLs from "../grouped-ddls/GroupedDDLs";
import { useState } from "react";
import ExamsList from "../../components/exams-list/ExamsList";
import { getAllTests } from '../../API/testApi';
import { useParams } from "react-router";
import { ArrowCircleUpIcon } from '@heroicons/react/solid'

const ExamFilter = () => {

    const IDs = useParams();
    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);
    const [due, setDue] = useState(null);
    const [exams, setExams] = useState([]);
    const [viewExams, setViewExams] = useState(false);

    const hideFilteredExams = () => {
        setViewExams(false);
    }
    const filterExams = async () => {
        if ((year && year != -1) || (semester && semester != -1) || (due && due != -1)) {
            try {
                setViewExams(true);
                const response = await getAllTests();
                let filteredExams = response?.data?.data?.allTests.nodes.filter(exam => exam.cid.trim() === IDs.courseID);
                if (year && year != -1) {
                    filteredExams = filteredExams.filter(exam => exam.year === parseInt(year));
                }
                if (semester && semester != -1) {
                    filteredExams = filteredExams.filter(exam => exam.semester.trim() === semester);
                }
                if (due && due != -1) {
                    filteredExams = filteredExams.filter(exam => exam.period.trim() === due);
                }
                setExams(filteredExams);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className=" dark:bg-gray-900 flex flex-col dark:bg-opacity-20 py-3 px-5 rounded-xl w-3/4 shadow ">
            <div className="text-center mb-6 ">
                <H2 text={'סינון מבחנים'} />
            </div>
            <GroupedDDLs enableNulls={true} year={year} setYear={setYear} semester={semester} setSemester={setSemester} due={due} setDue={setDue} />
            <div className="flex my-2 w-full justify-center">
                <Button text={'סינון'} clickHandler={filterExams} />
            </div>
            {viewExams && <div className="bg-blue-50 dark:bg-gray-700 w-full rounded-xl pt-4 shadow mt-4 ">
                <div className="mb-3 flex justify-center items-center">
                    <H2 text={exams.length == 0 ? 'לא נמצאו מבחנים' : 'רשימת המבחנים שנמצאו'} />
                </div>
                <div className="flex justify-start overflow-x-auto pb-2 scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
                    {viewExams && <ExamsList exams={exams} />}
                </div>
                <div className="flex pt-4 items-center justify-center">
                    {viewExams && exams.length != 0 && <ArrowCircleUpIcon className="h-10 w-10 transform text-indigo-600 cursor-pointer" onClick={hideFilteredExams} />}
                </div>
            </div>}
        </div>
    )
}
export default ExamFilter