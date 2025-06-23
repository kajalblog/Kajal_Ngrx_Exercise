import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Project, Users } from "../../model/task";




const getProjects = createFeatureSelector<Project[]>('projects')
export const selectUserState = createFeatureSelector<Users[]>('users');
export const getProjectList = createSelector(getProjects, (state) => {
  return state;
});
export const selectProjectById = (id: number) =>
  createSelector(getProjects, (project: Project[]) =>
    project.find(project => +project.id == id) // + handles string/number mismatch
  );
export const selectProjectsWithUsers = createSelector(
  getProjects,
  selectUserState,
  (projects: Project[], users: Users[]) => {
    return projects.map(project => ({
      ...project,
      users: users.filter(user => project.users.includes(user.id as string))
    }));
  }
);