// Comment level queries

export const createCourseCommentQuery = `mutation createCourseComment( $uid: String!, $did:Int!, $cid:String!, $body: String! $attachment: String) {
  createCourseComment(input: {courseComment: {uid: $uid, did: $did, cid: $cid, body: $body, attachment: $attachment}}
    ) {
      courseComment {
          uid
          did
          cid
          body
          attachment
      }
    } 
}`

export const updateCourseCommentQuery = `mutation updateCourseCommentById( {$id: Int!, $body: String!, $attachment: String!) {
    updateCourseCommentById(input: {id: $id, courseCommentPatch: {body: $body, attachment: $attachment}}
      ) {
        courseCommentPatch {
            id
            body
            attachment
        }
      } 
  }`

export const createTestCommentQuery = `mutation createTestComment( $uid: String!, $did:Int!, $tid:Int!, $cid:String!, $body: String!, $attachment: String) {
    createTestComment(input: {testComment: {uid: $uid, did: $did, tid: $tid, cid: $cid, body: $body, attachment: $attachment}}
      ) {
        testComment {
            uid
            did
          	tid
          	cid
            body
            attachment
        }
      } 
  }`

export const updateTestCommentQuery = `mutation updateTestCommentById( {$id: Int!, $body: String!) {
    updateTestCommentById(input: {id: $id, testCommentPatch: {body: $body}}
      ) {
        testCommentPatch {
            id
            body
        }
      } 
  }`

export const createQuestionCommentQuery = `mutation createQuestionComment( $uid: String!, $did:Int!, $body: String!, $attachment: String) {
  createQuestionComment(input: {questionComment: {uid: $uid, did: $did, body: $body, attachment: $attachment}}
    ) {
      questionComment {
          uid
          did
          body
          attachment
      }
    } 
}`

export const updateQuestionCommentQuery = `mutation updateQuestionCommentById( {$id: Int!, $body: String!, $attachment: String!) {
    updateQuestionCommentById(input: {id: $id, questionCommentPatch: {body: $body, attachment: $attachment}}
      ) {
        questionCommentPatch {
            id
            body
            attachment
        }
      } 
  }`