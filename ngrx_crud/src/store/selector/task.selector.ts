import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Project, Tasks, Users } from "../../model/task";


const getTaskState = createFeatureSelector<Tasks[]>('tasks')

export const getTaskListData = createSelector(getTaskState, (state) => {
  // console.log("task", state)
  return state;
});

export const selectProjectState = createFeatureSelector<Project[]>('projects');
export const selectUserState = createFeatureSelector<Users[]>('users');

export const selectEnrichedTasks = createSelector(
  getTaskState,
  selectProjectState,
  selectUserState,
  (tasks: Tasks[], projects: Project[], users: Users[]) => {
    // console.log(tasks, projects, users)
    return (tasks || []).map(task => {
      const projectName = (() => {
        const match = projects.find(p => +p.id === +task.project);
        // console.log('Matched Project:', match);
        return match?.name || 'Unknown Project';
      })();

      const userNames = (task.users || []).map(userId => {
        // console.log(typeof (userId), users)
        const match = users.find(u => +u.id === +userId);
        // console.log('User Match for', userId, ':', match);
        return match?.name || 'Unknown User';
      });


      return {
        ...task,
        projectName,
        userNames
      };
    });
  }
);


export const selectTaskById = (id: number) =>
  createSelector(getTaskState, (task: Tasks[]) => 
     task.find(task => +task.id == id) // + handles string/number mismatch
  );


  




