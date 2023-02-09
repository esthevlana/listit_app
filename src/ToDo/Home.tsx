import { Label, Pivot, PivotItem, Stack } from "@fluentui/react";
import { createContext, useState } from "react";
import HomeStyle from "./Home.style";
import TaskList from "./List/TaskList";
import TodoString from "./String.json";
import { ITask, PivotKeysEnum } from "./Type";
import TodoProvider from "./TodoProvider";
import TaskForm from "./TaskForm/TaskForm";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);

  return (
    <Stack className={HomeStyle.todoContainer}>
      <TodoProvider>
        <header className={HomeStyle.headerStyle}>
          <h2>{TodoString.header}</h2>
        </header>

        <Stack className={HomeStyle.pivotContainer}>
          <Pivot
            selectedKey={String(selectedKey)}
            styles={{ root: HomeStyle.pivotRoot }}
            onLinkClick={(item?: PivotItem) => {
              setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
            }}
          >
            {/* change the default headerText & itemKey  by the values created on type.ts file*/}
            <PivotItem
              headerText={TodoString.pivots.tasksTab}
              itemKey={PivotKeysEnum.Tasks}
            >
              <TaskList />
            </PivotItem>
            <PivotItem
              headerText={TodoString.pivots.taksFormTab}
              itemKey={PivotKeysEnum.TaskForm}
            >
              <TaskForm />
            </PivotItem>
            <PivotItem
              headerText={TodoString.pivots.completedTaskTab}
              itemKey={PivotKeysEnum.Completed}
            >
              <Label>Pivot #3</Label>
            </PivotItem>
          </Pivot>
        </Stack>
      </TodoProvider>
    </Stack>
  );
};

export default Home;