
class KanbanBoard {
    constructor() {
        this.columns = document.querySelectorAll('.column');
        this.taskLists = document.querySelectorAll('.task-list');
        this.draggedTask = null;
        
        this.initDragAndDrop();
    }
    
    initDragAndDrop() {
        this.setupDraggableTasks();
        this.setupDropZones();
    }
    
    setupDraggableTasks() {
        const tasks = document.querySelectorAll('.task');
        
        tasks.forEach(task => {
            task.addEventListener('dragstart', this.handleDragStart.bind(this));
            task.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
    }
    
    setupDropZones() {
        this.taskLists.forEach(list => {
            list.addEventListener('dragover', this.handleDragOver.bind(this));
            list.addEventListener('drop', this.handleDrop.bind(this));
            list.addEventListener('dragenter', this.handleDragEnter.bind(this));
            list.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
    }
    
    handleDragStart(e) {
        this.draggedTask = e.target.closest('.task');
        if (this.draggedTask) {
            this.draggedTask.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        }
    }
    
    handleDragEnd(e) {
        if (this.draggedTask) {
            this.draggedTask.classList.remove('dragging');
        }
        
        this.taskLists.forEach(list => {
            list.classList.remove('drag-over');
        });
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    handleDragEnter(e) {
        const list = e.target.closest('.task-list');
        if (list) {
            list.classList.add('drag-over');
        }
    }
    
    handleDragLeave(e) {
        const list = e.target.closest('.task-list');
        if (list && !list.contains(e.relatedTarget)) {
            list.classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        
        const targetList = e.target.closest('.task-list');
        if (!targetList || !this.draggedTask) return;
        
        targetList.classList.remove('drag-over');
        
        if (targetList !== this.draggedTask.parentElement) {
            targetList.appendChild(this.draggedTask);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new KanbanBoard();
});