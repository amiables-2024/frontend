export type User = {
    id: string;
    name: string;
}

export type Message = {
    id: string;
    content: string;
    user: User;
    createdAt: Date;
}

export type Todo = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    status: string;
    priority: string;
    assignee?: User;
}

export type Project = {
    id: string;
    name: string;
    messages: Message[];
    todos: any[];
    progression: number;
}