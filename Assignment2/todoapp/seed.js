var statusEnum = {
    ACTIVE : "Active",
    DELETE : "Delete",
    COMPLETE : "Complete"
};

var todoList = {
    1 : {title : "Learn Javascript", status: statusEnum.ACTIVE},
    2 : {title : "Git Tutorial", status: statusEnum.ACTIVE},
    3 : {title : "Interactive Git", status: statusEnum.ACTIVE},
}

var nextId = 4;

module.exports = {
    statusEnum : statusEnum,
    todoList : todoList,
    nextId : nextId
}
