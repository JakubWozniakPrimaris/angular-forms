import { computed, inject, Injectable, signal } from "@angular/core";
import { AccountService } from "../../account.service";
import { v4 as uuidv4 } from 'uuid';

export type Task = {
    uuid: string,
    userId: string,
    title: string,
    description: string,
    creationDate: string,
    modificationDate: string,
    dueDate: string
};

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private accountService = inject(AccountService);
    private _tasks = signal<Task[]>([]);

    loggedInUsersTasks = computed(() => this._tasks().filter(task => task.userId === this.accountService.loggedInId()));

    constructor() {
        this.fetchTasks();
    }

    addTask(title: string, description: string, dueDate: string) {
        const now = this.getNowDateString();

        this._tasks.set([...this._tasks(), {
            uuid: uuidv4(),
            userId: this.accountService.loggedInId()!,
            title: title,
            description: description,
            creationDate: now,
            modificationDate: now,
            dueDate: dueDate
        }]);
        this.saveTasks();
    }

    deleteTask(uuid: string) {
        this._tasks.set(
            this._tasks().filter(tsk => tsk.uuid !== uuid)
        );
        this.saveTasks();
    }

    updateTask(task: Task) {
        const tsk = this._tasks().find(tsk => tsk.uuid === task.uuid);

        if (tsk === undefined) {
            return { 'error': 'Account with this uuid does not exist' };
        }

        tsk.title = task.title;
        tsk.description = task.description;
        tsk.dueDate = tsk.dueDate;
        tsk.modificationDate = this.getNowDateString();
        this.saveTasks();

        return { error: '' };
    }

    private getNowDateString() {
        const date = new Date();
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    private fetchTasks() {
        this._tasks.set(JSON.parse(window.localStorage.getItem('tasks') ?? "[]"));
    }

    private saveTasks() {
        window.localStorage.setItem('tasks', JSON.stringify(this._tasks()));
    }
}
