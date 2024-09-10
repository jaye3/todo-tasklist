const { default: axiosInstance } = require("../utils/axiosInstance");
// this doc is to code the SENDING of HTTP request

async function getToDoTasks() {
    // Send request to backend (saved in a var bc backend will return array)
    const res = await axiosInstance({
        method: "get",  // HTTP request method
        url: "/tasks/to-do"   // specifies url of endpoint
    });

    // Return list of to-do tasks (from backend response)
    return res.data;
        // return the body of the response 
        // (backend will send many things back, body is main content)
};

async function getDoneTasks() {
    // Send request to backend (saved in a var bc backend will return array)
    const res = await axiosInstance({
        method: "get",  // HTTP request method
        url: "/tasks/done"   // specifies url of endpoint
    });

    // Return list of done tasks (from backend response)
    return res.data;
};

async function postNewTask(newTask) {
    // Send request to backend
    const res = await axiosInstance({
        method: "post", 
        url: "/tasks", 
        data: newTask   // i.e. the req body
    });

    // Tell user if creation is successful
    return res.status === 201;   // status code for OK!
};

async function updateTaskStatus(id) { // take in ID as argument
    const res = await axiosInstance ({
        method: "put", 
        url: `/tasks/${id}`     // `${var}` to format string in JS; JS version of f"{var}"
    })

    return res.status === 200;
};

export {
    getDoneTasks, 
    getToDoTasks, 
    postNewTask, 
    updateTaskStatus
};