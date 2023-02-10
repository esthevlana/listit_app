import useInput from "./useInput";
import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../TodoProvider";
import { ActionTypeEnum, ITask } from "../Type";
import TodoString from "../String.json";

type Props = {
  editTaskId: string | null;
};

const TaskForm = ({ editTaskId }: Props) => {
  const { activeTasks, dispatch } = useContext(TodoContext);

  const title = useInput("");
  const description = useInput("");

  useEffect(() => {
    if (editTaskId) {
      const taskData = activeTasks.find((task) => task.id === editTaskId);

      title.set(taskData?.title || "");
      description.set(taskData?.description || "");
    }
  }, [editTaskId]);

  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" });

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "" });
      }, 2000);
    }
  }, [showMessage.message]);

  const addTaskAction = () => {
    const data: ITask = {
      id: "",
      title: title.value,
      description: description.value,
      isFav: false,
    };
    dispatch({ type: ActionTypeEnum.Add, data });
    setShowMessage({ type: MessageBarType.success, message: "Task Added" });
    title.set("");
    description.set("");
  };

  const updateTaskAction = () => {
    const taskData = activeTasks.find((task) => task.id === editTaskId);
    if (taskData) {
      const data: ITask = {
        id: taskData.id,
        title: title.value,
        description: description.value,
        isFav: taskData.isFav,
      };

      dispatch({ type: ActionTypeEnum.Update, data });
      setShowMessage({ type: MessageBarType.success, message: "Task Updated" });
    } else {
      setShowMessage({
        type: MessageBarType.error,
        message: "An error occurred while updating task",
      });
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    editTaskId ? updateTaskAction() : addTaskAction();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <TextField label="Title" required {...title} />
      <TextField
        label="Description"
        multiline
        rows={4}
        required
        {...description}
      />

      <Stack horizontal tokens={{ childrenGap: 15 }} style={{ marginTop: 20 }}>
        <Stack style={{ width: "80%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {showMessage.message}
            </MessageBar>
          )}
        </Stack>

        <Stack style={{ width: "20%" }}>
          <PrimaryButton
            type="submit"
            text={
              editTaskId
                ? TodoString.updateTaskButton
                : TodoString.addTaskButton
            }
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
