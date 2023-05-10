import Comments from "../models/comment.model";
import { COMMENT, RESPONSE } from "../types";

const addComment = async (req: any, res: any) => {
  const commentObj: COMMENT  = {
    ani_id: req.params.id,
    user: req.user.id,
    comment: req.body.comment,
  }
  Comments.create(commentObj).then((data) => {
    return res.status(201).json({
      code: 201,
      message: 'Comment Added',
      data,
    } as RESPONSE)
  })
}

const getAllComments = async (req: any, res: any) => {
  Comments.find({ ani_id: req.params.id }).populate('user', 'username').then((data) => {
    return res.status(200).json({
      code: 200,
      message: 'Comments Fetched',
      data,
    } as RESPONSE)
  })
  .catch((error) => {
    return res.status(400).json({
      code: 400,
      message: 'Error While Getting All Comments',
      error,
    } as RESPONSE)
  })
}

export default { getAllComments, addComment }