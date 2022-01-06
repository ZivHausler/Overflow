import CourseHeader from "../../components/course-header/CourseHeader";
import Discussions from '../../components/discussions/Discussions';
import { useParams } from "react-router";
import { useState, useEffect } from "react"
import { getAllTests } from "../../API/testApi";
import { getAllCourses } from '../../API/courseApi'
import { getQuestionUserRate, createQuestionUserRate } from '../../API/questionApi'
import { useAuth0 } from '@auth0/auth0-react'

const QuestionPage = ({ setIsPopupOpen, isPopupOpen, setPopupType, contentUpdated }) => {

    const { user, isLoading } = useAuth0();
    const [courseName, setCourseName] = useState('');
    const [examDefenition, setExamDefenition] = useState('');
    const [userRate, setUserRate] = useState(null);
    const [hasUserVoted, setHasUserVoted] = useState(false);
    const [avgVote, setAvgVote] = useState(0);
    const IDs = useParams();

    useEffect(() => {
        (async () => {
            try {
                if (!isLoading && user) {
                    const userVotes = await getQuestionUserRate();
                    if (userVotes.data.data.allQuestionsUserRates.nodes.length > 0)
                        calculateAvgRating(userVotes.data.data.allQuestionsUserRates.nodes);
                    userVotes.data.data.allQuestionsUserRates.nodes.forEach(vote => {
                        if (vote.uid === user.sub.split("|")[1] && vote.qnum === parseInt(IDs.questionID) && vote.tid === parseInt(IDs.examID)) {
                            setUserRate(parseInt(vote.personalRate));
                            setHasUserVoted(true);
                        }
                    })
                };
                const response = await getAllCourses();
                const allCourses = response.data.data.allCourses.nodes;
                allCourses.forEach(course => {
                    if (course.id === IDs.courseID) {
                        setCourseName(course.name);
                    }
                });
                const tests = await getAllTests();
                tests.data.data.allTests.nodes.forEach(test => {
                    if (test.cid.trim() === IDs.courseID && test.id === parseInt(IDs.examID)) {
                        setExamDefenition({
                            "year": test.year,
                            "period": test.period,
                            "semester": test.semester
                        })
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        })();
    }, [isLoading])

    const calculateAvgRating = (list) => {
        const newList = list.filter(item => item.qnum === parseInt(IDs.questionID) && item.tid === parseInt(IDs.examID))
        if (newList.length <= 0) return;
        const avg = newList.reduce((a, b) => { return a + b.personalRate }, 0) / newList.length;
        setAvgVote(avg);
    }

    useEffect(() => {
        (async () => {
            try {
                if (!isLoading && user && !hasUserVoted) {
                    // user hasnt voted yet
                    // push hardness to db
                    const response = await createQuestionUserRate({
                        "uid": user.sub.split("|")[1],
                        "tid": parseInt(IDs.examID),
                        "personalRate": parseInt(userRate),
                        "qnum": parseInt(IDs.questionID),
                    })
                    if (!response.data.errors) {
                        setHasUserVoted(true);
                        setUserRate(parseInt(userRate));
                        const userVotes = await getQuestionUserRate();
                        if (userVotes.data.data.allQuestionsUserRates.nodes.length > 0)
                            calculateAvgRating(userVotes.data.data.allQuestionsUserRates.nodes);
                    }
                }
                else{
                    // only update is needed
                    const userVotes = await getQuestionUserRate();
                        if (userVotes.data.data.allQuestionsUserRates.nodes.length > 0)
                            calculateAvgRating(userVotes.data.data.allQuestionsUserRates.nodes);
                }
            }
            catch (error) {
                console.log(error);
            }
        })();
    }, [userRate])

    return (
        <>
            <div dir='rtl' className="flex shadow rounded-lg p-5 dark:bg-gray-900 flex-col mx-auto my-10 items-center max-w-7xl">
                <CourseHeader avgVote={avgVote} hasUserVoted={hasUserVoted} userRate={userRate} setUserRate={setUserRate} setPopupType={setPopupType} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} courseName={courseName} examID={examDefenition} questionNum={IDs.questionID} discussionBTN={'דיון חדש'} />
            </div>
            <div dir="rtl" className="max-w-7xl m-auto">
                <Discussions type={'question'} contentUpdated={contentUpdated} />
            </div>
        </>
    )
}
export default QuestionPage