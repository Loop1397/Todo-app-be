const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마 제작
const taskSchema = Schema({
    task:{
        type: String,
        require: true
    },
    isComplete: {
        type: Boolean,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        require:true,
        ref: "User"
    }
}, 
    // timestamps: createdAt, updatedAt을 자동으로 추가해주는 옵션
    {timestamps: true}
);

// 스키마를 토대로 모델 제작
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;