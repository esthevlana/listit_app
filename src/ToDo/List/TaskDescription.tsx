import { FontIcon, mergeStyles, TeachingBubble } from "@fluentui/react";
import { ITask } from "../Type";
import { useBoolean, useId } from "@fluentui/react-hooks";
import TaskListStyle from "./TaskList.style";

type Props = {
  task: ITask;
};

const TaskDescription = ({ task }: Props) => {
  const buttonId = useId("targetButton");
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);

  return (
    <>
      <FontIcon
        id={buttonId}
        iconName="Info"
        className={
          task.description
            ? TaskListStyle.iconStyle
            : mergeStyles(TaskListStyle.iconStyle, TaskListStyle.disabled)
        }
        onClick={ task.description ? toggleTeachingBubbleVisible : () => {}}
      />
      {teachingBubbleVisible && (
        <TeachingBubble
          target={`#${buttonId}`}
          headline={task.title}
          onDismiss={toggleTeachingBubbleVisible}
        >
          {task.description}
        </TeachingBubble>
      )}
    </>
  );
};

export default TaskDescription;
