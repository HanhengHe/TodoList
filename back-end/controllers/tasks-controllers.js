const {validationResult} = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Task = require('../models/task');

const getTaskById = async (req, res, next) => {
    const taskId = req.params.tid;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find the task.', 500);
        return next(error);
    }

    if (! task) {
        const error = new HttpError('Could not find task for the provided id.', 404);
        return next(error);
    }

    res.json({
        task: task.toObject(
            {getters: true}
        )
    });
};

const getTasksByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithTasks;
    try {
        userWithTasks = await User.findById(userId).populate('tasks');
    } catch (err) {
        const error = new HttpError('Fetching tasks failed, please try again later.', 500);
        return next(error);
    }

    if (! userWithTasks || userWithTasks.tasks.length === 0) {
        return next(new HttpError('Could not find tasks for the provided user id.', 404));
    }

    res.json({
        places: userWithTasks.tasks.map(task => task.toObject({getters: true}))
    });
};

const createTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {title, description, from, to} = req.body;

    const createdTask = new Task({state: false, title, description, from, to});

    let userFrom, userTo;
    try {
        userFrom = await User.findById(from);
        userTo = await User.findById(to);
    } catch (err) {
        const error = new HttpError('Creating task failed, please try again.', 500);
        return next(error);
    }

    if (! userFrom || userTo) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createTask.save({session: sess});
        userFrom.tasks.push(createdTask);
        await userFrom.save({session: sess});
        userTo.tasks.push(createdTask);
        await userTo.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating task failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({task: createTask});
};

const updateTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {title, description} = req.body;
    const taskId = req.params.tid;
    const uid = req.userData.userId;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update task.', 500);
        return next(error);
    }

    if (task.from.toString() !== uid && task.to.toString() !== uid) {
        const error = new HttpError('You are not allowed to edit this task.', 401);
        return next(error);
    }

    task.title = title;
    task.description = description;

    try {
        await task.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update task.', 500);
        return next(error);
    }

    res.status(200).json({
        task: task.toObject(
            {getters: true}
        )
    });
};

const deleteTask = async (req, res, next) => {
    const taskId = req.params.tid;

    let task;
    try {
        task = await Task.findById(taskId).populate('from');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    if (! task) {
        const error = new HttpError('Could not find task for this id.', 404);
        return next(error);
    }

    const uid = req.userData.userId;

    if (task.from.id !== uid && task.to.id !== uid) {
        const error = new HttpError('You are not allowed to delete this place.', 401);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await task.remove({session: sess});
        task.from.tasks.pull(task);
        await task.from.save({session: sess});
        task.to.tasks.pull(task);
        await task.to.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete task.', 500);
        return next(error);
    }

    res.status(200).json({message: 'Deleted task.'});
};

exports.getTaskById = getTaskById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
