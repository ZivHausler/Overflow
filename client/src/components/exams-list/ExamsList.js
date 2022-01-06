import ExamExample from "../../general-components/ExamExample"
import { Link, useParams } from "react-router-dom"

const ExamsList = ({ exams }) => {
    const IDs = useParams();

    return (
        <div className="my-2 px-3 flex flex-col items-center ">
            <div className="flex flex-nowrap justify-center ">
                {exams.map((exam, index) => <Link key={index} to={`/course=${IDs.courseID}/exam=${exam.id}`}><ExamExample exam={exam} /></Link>)}
                {exams.forEach((exam, index) => {
                    <Link key={index} to={`/course=${IDs.courseID}/exam=${exam.id}`}><ExamExample exam={exam} /></Link>
                })}
            </div>

        </div>
    )
}
export default ExamsList