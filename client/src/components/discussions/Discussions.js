import Discussion from "./Discussion";
import DiscussionsList from "./DiscussionsList";
import { useState, useEffect } from "react";
import { getAllCourseDiscussions } from "../../API/courseApi";
import { getAllTestDiscussions } from "../../API/testApi";
import { getAllQuestionDiscussions } from "../../API/questionApi";
import { useParams } from "react-router";

const Discussions = ({ type, contentUpdated }) => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const IDs = useParams();

  useEffect(() => {
    (async () => {
      try {
        let response,
          allDiscussions = [];
        switch (type) {
          case "course":
            response = await getAllCourseDiscussions();
            allDiscussions =
              response.data.data.allCourseDiscussions.nodes.filter(
                (discussion) => IDs.courseID === discussion.cid.trim()
              );
            break;

          case "exam":
            response = await getAllTestDiscussions();
            allDiscussions = response.data.data.allTestDiscussions.nodes.filter(
              (exam) =>
                exam.cid.trim() === IDs.courseID &&
                exam.tid === parseInt(IDs.examID)
            );
            break;

          case "question":
            response = await getAllQuestionDiscussions();
            allDiscussions =
              response.data.data.allQuestionDiscussions.nodes.filter(
                (discussion) =>
                  discussion.qnum === parseInt(IDs.questionID) &&
                  discussion.tid === parseInt(IDs.examID)
              );
            break;
          default:
            break;
        }
        setDiscussions(allDiscussions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [contentUpdated]);

  return (
    <div className="flex flex-col h-screen-1/2 md:flex-row p-3 mt-5">
      <div className="flex sm:flex-auto  m-2 md:w-1 shadow dark:bg-gray-800 rounded-lg">
        <DiscussionsList
          type={type}
          discussions={discussions}
          setSelectedDiscussion={setSelectedDiscussion}
        />
      </div>
      {selectedDiscussion && (
        <div className="flex  sm:flex-auto dark:bg-gray-800 m-2 md:w-80 rounded-lg shadow">
          <Discussion
            type={type}
            selectedDiscussion={selectedDiscussion}
            setSelectedDiscussion={setSelectedDiscussion}
          />
        </div>
      )}
    </div>
  );
};
export default Discussions;
