const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({task, isComplete});

        await newTask.save();
        res.status(200).json({
            status: 'success',
            data: newTask
        });
    } catch(error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

taskController.getTask = async (req, res) => {
    try {
        // select("-__v") 는 데이터에서 __v를 제외하고 가져오라는 뜻
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({
            status: 'success',
            data: taskList
        });
    } catch(error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id});
        // 통신에 문제가 없지만 id에 맞는 할 일이 발견되지 않을 시
        if(!task) {
            res.status(404).json({
                status: 'fail',
                message: `can't find todo from id:${req.params.id}`
            });
        }
        
        // 상태가 true라면 false로, false라면 true로
        task.isComplete = !task.isComplete;
        await task.save();

        res.status(200).json({
            status: 'success',
            data: task
        });
    } catch(error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

taskController.deleteTask = async (req, res) => {
    try {
        const deletedItem = await Task.deleteOne({_id: req.params.id});

        res.status(200).json({
            status: 'success',
            data: deletedItem
        });
    } catch(error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

module.exports = taskController;