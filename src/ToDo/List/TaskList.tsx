import { Checkbox, FontIcon, mergeStyles, Stack } from "@fluentui/react";
import { useContext } from "react";
import { TodoContext } from "../TodoProvider";
import { ActionTypeEnum, ITask } from "../Type";
import TaskListStyle from "./TaskList.style";
import TodoString from "../String.json";
import TaskDescription from "./TaskDescription";

const TaskList = () => {
  const { activeTasks, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } });
    }
  };

  const onFavoriteClick = (id: string) => {
    dispatch({ type: ActionTypeEnum.ToggleFavorite, data: { id } });
  }

  const onRenderCell = (task: ITask) => {
    return (
      /* horizontal align items in a roll */
      <Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox />
          {task.title}
        </Stack>

        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription />
          <FontIcon
            iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={task.isFav ? mergeStyles(TaskListStyle.iconStyle, { color: "blue" }) : TaskListStyle.iconStyle}
            onClick={() => onFavoriteClick(task.id)}
          />
          <FontIcon iconName="EditNote" className={TaskListStyle.iconStyle} />
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconStyle}
            onClick={() => onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };

  return <div>{activeTasks.map(onRenderCell)}</div>;
};

export default TaskList;
