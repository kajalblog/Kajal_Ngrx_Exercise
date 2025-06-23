 export interface Tasks {
    id?:number,
    title:string,
    description:string,
    tags:string,
    duration:string
}

// export class Tasks implements Task {
//   id?: number;
//   title!: string;
//   description!: string;
//   tags!: string;
//   duration!: string;
// }

export interface Users
{
id:string,
name:string,
email:string
}
// constructor()
// {

// }

export interface Project{
    id:number,
    name:string,
    description:string,
    users:string[]
}
