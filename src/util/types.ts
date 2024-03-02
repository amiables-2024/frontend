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

export enum TodoStatusEnum {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export enum TodoPriorityEnum {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}


export type Todo = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    status: TodoStatusEnum;
    priority: TodoPriorityEnum;
    assignee?: User;
}

export type Project = {
    id: string;
    name: string;
    messages: Message[];
    todos: any[];
    progression: number;
}