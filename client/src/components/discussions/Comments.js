import { ThumbUpIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../API/usersApi";
import { CSSTransition } from "react-transition-group";
import { Container, Alert } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

const Comments = ({
  isImageDisplayed,
  setIsImageDisplayed,
  comments,
  onScreenClick,
}) => {
  const elementRef = useRef(null);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [comments]);

  const checkUserName = (id) => {
    let a_user;
    users.forEach((user) => {
      if (user.id === id) a_user = user;
    });
    return `${a_user.firstname}_${a_user.lastname}`;
  };

  const renderReplies = (comments) => {
    if (comments.length === 0)
      return (
        <div className="shadow-md bg-gray-50 dark:bg-gray-700 mx-1 px-3 py-2 rounded-xl my-3">
          <h1 className="h-12 flex flex-col items-center justify-center">
            אין תגובות עדיין. אולי תשקול להיות הראשון?
          </h1>
        </div>
      );
    return comments.map((comment, index) => (
      <div
        key={index}
        className="flex flex-col justify-center shadow bg-gray-50 dark:bg-gray-700 mx-1 px-3 py-2 rounded-xl my-3"
      >
        <div className="flex justify-between">
          <p className="mb-4 break-words">{comment.body}</p>
          {console.log(`comment number ${index}'s img`, comment.attachment)}
          {comment.attachment && (
            <img
              ref={onScreenClick}
              className="object-contain rounded-xl  w-24 m-3 shadow cursor-pointer"
              onClick={() => setIsImageDisplayed(comment.attachment)}
              src={comment.attachment}
              alt=""
            />
          )}
        </div>
        <div className="flex  justify-between items-center mt-2">
          {/* <p dir="ltr" className="font-semibold">@{comment.user.name.replaceAll(" ", "_")}</p> */}
          <p dir="ltr" className="text-sm font-semibold">
            @{checkUserName(comment.uid)}
          </p>
          <div className="flex items-center">
            {/* <div className="flex mx-3 justify-between items-center">
                            <ThumbUpIcon className="h-5 w-5" />
                            <p className=" text-md">{4}</p>
                        </div> */}
            <p className="mx-2 text-sm">
              {dateToString(comment.createdAt.split("T")[0])}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  const dateToString = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-h-md px-5 scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 pl-5 overflow-y-auto rounded-xl">
      {renderReplies(comments)}
      <div ref={elementRef} />
    </div>
  );
};
export default Comments;
