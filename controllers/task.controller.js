import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    console.log("REQ.USER =>", req.user);

    const task = await Task.create({
        ...req.body,
        user: req.user._id
    })
    res.status(201).json(task);
}

// export const getTasks = async (req, res) => {
//     const tasks = await Task.find({ user: req.user._id });
//     res.json(tasks);
// }

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // 🔥 Admin sees all tasks with user info
      tasks = await Task.find().populate("user", "name email");
    } else {
      // Normal user sees only own tasks
      tasks = await Task.find({ user: req.user._id });
    }

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        return res.status(404).json({ message: "Task not found" })
    }

    if (task.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" })
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
}

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Not found" });

    if (
        task.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    )
        return res.status(403).json({ message: "Forbidden" });

    await task.deleteOne();
    res.json({ message: "Deleted" });
};