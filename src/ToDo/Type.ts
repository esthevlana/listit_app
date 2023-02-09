import { Dispatch } from "react";

export enum PivotKeysEnum {
    Tasks = "Tasks",
    TaskForm = "TaskForm",
    Completed = "CompletedTasks"
}

export interface ITask {
    id: string;
    title: string;
    description?: string,
    isFav: boolean;
  }

export interface ITodoContext {
    activeTasks: ITask[]
    dispatch: Dispatch<any>
  }

export interface ITodoState {
    activeTasks: ITask[];
  }

  export enum ActionTypeEnum {
    Add,
    Delete
  }

  export type IReducerAction = IAddAction | IDeleteAction
  export interface IAddAction {
    type : ActionTypeEnum.Add,
    data : ITask
  }

  export interface IDeleteAction {
    type : ActionTypeEnum.Delete,
    data : { id : string }
  }