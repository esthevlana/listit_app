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

const TaskForm = () => {
  const { dispatch } = useContext(TodoContext);

  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" });
  const title = useInput("");
  const description = useInput("");

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "" });
      }, 2000);
    }
  }, [showMessage.message]);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data: ITask = {
      id: "",
      title: title.value,
      description: description.value,
      isFav: false,
    };
    dispatch({ type: ActionTypeEnum.Add, data });
    setShowMessage({ type: MessageBarType.success, message: "Task Added" });
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
              Task Added
            </MessageBar>
          )}
        </Stack>

        <Stack style={{ width: "20%" }}>
          <PrimaryButton type="submit" text="Add Task" />
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
