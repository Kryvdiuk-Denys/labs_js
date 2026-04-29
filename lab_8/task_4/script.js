
const languages = [
    { id: 'js', name: 'JavaScript', icon: '🟨', tags: ['веб', 'скрипти'] },
    { id: 'python', name: 'Python', icon: '🐍', tags: ['дані', 'AI'] },
    { id: 'java', name: 'Java', icon: '☕', tags: ['企业', 'OOP'] },
    { id: 'ts', name: 'TypeScript', icon: '📘', tags: ['типи', 'JS'] },
    { id: 'rust', name: 'Rust', icon: '🦀', tags: ['системи', 'швидкість'] },
    { id: 'go', name: 'Go', icon: '🔵', tags: ['хмара', 'мікро'] },
    { id: 'kotlin', name: 'Kotlin', icon: '🟣', tags: ['Android', 'JVM'] },
    { id: 'swift', name: 'Swift', icon: '🍎', tags: ['iOS', 'macOS'] },
    { id: 'cpp', name: 'C++', icon: '⚙️', tags: ['ігри', 'системи'] },
    { id: 'php', name: 'PHP', icon: '🐘', tags: ['веб', 'сервер'] },
    { id: 'ruby', name: 'Ruby', icon: '💎', tags: ['веб', 'rails'] },
    { id: 'csharp', name: 'C#', icon: '🟦', tags: ['.NET', 'Unity'] }
];

class CardGrid {
    constructor() {
        this.container = document.getElementById('gridContainer');
        this.editBtn = document.getElementById('editBtn');
        this.data = [...languages];
        this.isEditMode = false;
        this.draggedItem = null;
        
        this.render();
        this.setupEvents();
    }
    
    render() {
        this.container.innerHTML = '';
        
        this.data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-id', item.id);
            card.setAttribute('data-index', index);
            card.draggable = false;
            
            card.innerHTML = `
                <button class="delete-btn" data-id="${item.id}">✖</button>
                <span class="language-icon">${item.icon}</span>
                <div class="language-name">${item.name}</div>
                <div class="language-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            
            this.container.appendChild(card);
        });
        
        this.setupCardEvents();
    }
    
    setupEvents() {
        this.editBtn.addEventListener('click', () => this.toggleEditMode());
    }
    
    setupCardEvents() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            if (this.isEditMode) {
                card.draggable = true;
                card.addEventListener('dragstart', this.handleDragStart.bind(this));
                card.addEventListener('dragover', this.handleDragOver.bind(this));
                card.addEventListener('dragend', this.handleDragEnd.bind(this));
                card.addEventListener('drop', this.handleDrop.bind(this));
                card.addEventListener('dragenter', this.handleDragEnter.bind(this));
                card.addEventListener('dragleave', this.handleDragLeave.bind(this));
            } else {
                card.draggable = false;
            }
            
            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.isEditMode) {
                        this.deleteCard(card.getAttribute('data-id'));
                    }
                });
            }
        });
    }
    
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        
        if (this.isEditMode) {
            this.editBtn.textContent = 'Готово';
            this.editBtn.classList.add('active');
        } else {
            this.editBtn.textContent = 'Редагувати';
            this.editBtn.classList.remove('active');
        }
        
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (this.isEditMode) {
                card.classList.add('edit-mode');
                card.draggable = true;
            } else {
                card.classList.remove('edit-mode');
                card.draggable = false;
            }
        });
        
        this.setupCardEvents();
    }
    
    handleDragStart(e) {
        this.draggedItem = e.target.closest('.card');
        if (this.draggedItem) {
            this.draggedItem.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        }
    }
    
    handleDragEnd(e) {
        if (this.draggedItem) {
            this.draggedItem.classList.remove('dragging');
        }
        
        const placeholder = document.querySelector('.drag-placeholder');
        if (placeholder) {
            placeholder.classList.remove('drag-placeholder');
        }
    }
    
    handleDragOver(e) {
        if (!this.isEditMode || !this.draggedItem) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    handleDragEnter(e) {
        if (!this.isEditMode || !this.draggedItem) return;
        
        const targetCard = e.target.closest('.card');
        if (targetCard && targetCard !== this.draggedItem) {
            targetCard.classList.add('drag-placeholder');
        }
    }
    
    handleDragLeave(e) {
        const targetCard = e.target.closest('.card');
        if (targetCard) {
            targetCard.classList.remove('drag-placeholder');
        }
    }
    
    handleDrop(e) {
        if (!this.isEditMode || !this.draggedItem) return;
        e.preventDefault();
        
        const targetCard = e.target.closest('.card');
        if (!targetCard || targetCard === this.draggedItem) return;
        
        const draggedIndex = parseInt(this.draggedItem.getAttribute('data-index'));
        const targetIndex = parseInt(targetCard.getAttribute('data-index'));
        
        if (!isNaN(draggedIndex) && !isNaN(targetIndex)) {
            const [movedItem] = this.data.splice(draggedIndex, 1);
            this.data.splice(targetIndex, 0, movedItem);
            
            this.render();
            
            setTimeout(() => {
                if (this.isEditMode) {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(card => card.classList.add('edit-mode'));
                    this.setupCardEvents();
                }
            }, 10);
        }
    }
    
    deleteCard(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.render();
            
            setTimeout(() => {
                if (this.isEditMode) {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(card => card.classList.add('edit-mode'));
                    this.setupCardEvents();
                }
            }, 10);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CardGrid();
});