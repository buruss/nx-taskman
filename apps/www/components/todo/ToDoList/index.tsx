import React from "react";
import CustomScrollbars from '../../../util/CustomScrollbars'

import ToDoItem from "./ToDoItem";

const ToDoList = (({ todos, onTodoSelect, onTodoChecked, onMarkAsStart }) => {
  return (
    <div className="gx-module-list">
      <CustomScrollbars className="gx-module-content-scroll">
        {todos.map((todo, index) =>
          <ToDoItem key={index} todo={todo} onTodoSelect={onTodoSelect}
            onMarkAsStart={onMarkAsStart}
            onTodoChecked={onTodoChecked} />
        )}
      </CustomScrollbars>
    </div>
  )
});

export default ToDoList;
