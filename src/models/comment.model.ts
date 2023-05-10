import { Schema } from 'mongoose';
import mongoose from 'mongoose';
  
export const Comments = new Schema({
    ani_id: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    comment: String,
});

const comments = mongoose.model("comment", Comments);
export default comments;