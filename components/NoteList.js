export class NoteList extends HTMLElement {
    constructor() {
        super();
        this.notes = [];
    }

    connectedCallback() {
        this.render();
    }

    set notes(notes) {
        this._notes = notes;
        this.render();
    }

    render() {
        this.innerHTML = '';
        this._notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.innerHTML = `
                <div class="note-content">
                    <h3>${note.title}</h3>
                    <p>${note.body}</p>
                </div>
                <div class="note-footer">
                    <button class="delete-button"><span class="delete-icon">🗑️</span>Delete</button>
                    <div class="archived-status">
                        <button class="archive-button">${note.archived ? 'Unarchive This Note' : 'Archive This Note'} <span class="archived-icon">${note.archived ? '📁' : '📎'}</span></button>
                    </div>
                </div>
            `;

            const deleteButton = noteItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                this.showConfirmationDialog(note.id);
            });
    
            const archiveButton = noteItem.querySelector('.archive-button');
            archiveButton.addEventListener('click', () => {
                this.toggleArchiveStatus(note.id);
            });
    
            this.appendChild(noteItem);
        });
    }
    
    showConfirmationDialog(noteId) {
        const confirmationDialog = document.createElement('confirmation-dialog');
        confirmationDialog.addEventListener('confirmed', () => this.deleteNoteFromLocalStorage(noteId));
        confirmationDialog.addEventListener('canceled', () => this.closeConfirmationDialog());
        document.body.appendChild(confirmationDialog);
    }

    deleteNoteFromLocalStorage(noteId) {
        let savedNotesData = JSON.parse(localStorage.getItem('notesData'));
        savedNotesData = savedNotesData.filter(note => note.id !== noteId);
        localStorage.setItem('notesData', JSON.stringify(savedNotesData));
        this.notes = savedNotesData;
        this.closeConfirmationDialog();
    }

    closeConfirmationDialog() {
        const confirmationDialog = document.querySelector('confirmation-dialog');
        confirmationDialog.parentNode.removeChild(confirmationDialog);
    }

    toggleArchiveStatus(noteId) {
        const archivable = this.getAttribute('data-archivable');

        if (archivable === 'true') {
            let savedNotesData = JSON.parse(localStorage.getItem('notesData'));
            const updatedNotesData = savedNotesData.map(note => {
                if (note.id === noteId) {
                    note.archived = !note.archived; 
                }
                return note;
            });
            localStorage.setItem('notesData', JSON.stringify(updatedNotesData));
            this.notes = updatedNotesData;
        } else {
            alert("Archiving notes tidak diperbolehkan. ganti html data-archivable='false' menjadi true!");
        }
    }
    
}
