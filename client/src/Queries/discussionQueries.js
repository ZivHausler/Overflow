// Discussion level queries

export const createCourseDiscussionQuery = `mutation createCourseDiscussion( $uid: String!, $cid:String!, $title: String!, $body: String!, $attachment: String) {
  createCourseDiscussion(input: {courseDiscussion: {uid: $uid, cid: $cid, title: $title, body: $body, attachment: $attachment}}
    ) {
      courseDiscussion {
          uid
          cid
          title
          body
          attachment
      }
    } 
}`

export const updateCourseDiscussionQuery = `mutation updateCourseDiscussionById( {$id: Int!, $title: String!, $body: String!, $attachment: String) {
    updateCourseDiscussionById(input: {id: $id, courseDiscussionPatch: {title: $title, body: $body, attachment: $attachment}}
      ) {
        courseDiscussionPatch {
            id
            title
            body
            attachment
        }
      } 
  }`

export const createTestDiscussionQuery = `mutation createTestDiscussion($uid: String!, $cid: String!, $tid: Int!, $title: String!, $body: String!, $attachment: String) {
  createTestDiscussion(
    input: {testDiscussion: {uid: $uid, cid: $cid, tid: $tid, title: $title, attachment: $attachment, body: $body}}
  ) {
    testDiscussion {
      attachment
      cid
      title
      uid
      tid
      body
    }
  }
}`

export const updateTestDiscussionQuery = `mutation updateTestDiscussionById( {$id: Int!, $title: String!, $body: String!, $attachment: String) {
    updateTestDiscussionById(input: {id: $id, testDiscussionPatch: {title: $title, body: $body, attachment: $attachment}}
      ) {
        testDiscussionPatch {
            id
            title
            body
            attachment
        }
      } 
  }`

export const createQuestionDiscussionQuery = `mutation createQuestionDiscussion( {$uid: String!, $tid:Int!, $position: Int!, $title: String!, $body: String!, $attachment: String) {
    createQuestionDiscussion(input: {questionDiscussion: {uid: $uid, tid: $tid, position: $position, title: $title, body: $body, attachment: $attachment}}
      ) {
        questionDiscussion {
            uid
            tid
            position
            title
            body
            attachment
        }
      } 
  }`

export const updateQuestionDiscussionQuery = `mutation updateQuestionDiscussionById( {$id: Int!, $title: String!, $body: String!, $attachment: String) {
    updateQuestionDiscussionById(input: {id: $id, questionDiscussionPatch: {title: $title, body: $body, attachment: $attachment}}
      ) {
        questionDiscussionPatch {
            id
            title
            body
            attachment
        }
      } 
  }`