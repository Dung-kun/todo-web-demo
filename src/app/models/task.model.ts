// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }

export class Task {
  constructor(
    public id: string = "",
    public title: string = "No Task",
    public description: string ="",
    public author: string = "",
    public status: string = "In process",
    public createdAt: string = ""
  ){

  }
}

export const taskList = [
  {
    id: '1',
    title: 'Làm todo app',
    date: new Date().toISOString().split('T')[0].toString(),
  },
  {
    id: '2',
    taskName: 'Muốn làm gì làm',
    date: new Date().toISOString().split('T')[0].toString(),
  },
  {
    id: '3',
    taskName: 'Muốn làm gì làm',
    date: new Date('1-2-2022').toISOString().split('T')[0].toString(),
  },
  {
    id: '4',
    taskName: 'Muốn làm gì làm',
    date: new Date('3/03/2022').toISOString().split('T')[0].toString(),
  },
  {
    id: '5',
    taskName: 'Không muốn cũng phải làm',
    date: new Date('1-1-2022').toISOString().split('T')[0].toString(),
  },
];
