export class FormAddNote extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form class="form-add-note">
        <input id="titleInput" type="text" placeholder="Masukkan Judul Notes" required>
        <div id="titleError" class="error-message"></div>
        <textarea id="bodyInput" placeholder="Isi Notes" required></textarea>
        <div id="bodyError" class="error-message"></div>
        <button type="button">Tambah Note</button>
      </form>
    `;
    this.setupEventListeners();
  }

  setupEventListeners() {
    const titleInput = this.querySelector('#titleInput');
    const bodyInput = this.querySelector('#bodyInput');

    titleInput.addEventListener('input', this.validateTitle.bind(this));
    bodyInput.addEventListener('input', this.validateBody.bind(this));

    this.querySelector('button').addEventListener('click', this.onSubmit.bind(this));
  }

  validateTitle() {
    const titleInput = this.querySelector('#titleInput');
    const titleError = this.querySelector('#titleError');
    const title = titleInput.value.trim();

    if (title.length === 0) {
      titleError.textContent = 'Judul diperlukan';
      titleInput.classList.add('invalid');
    } else {
      titleError.textContent = '';
      titleInput.classList.remove('invalid');
    }
  }

  validateBody() {
    const bodyInput = this.querySelector('#bodyInput');
    const bodyError = this.querySelector('#bodyError');
    const body = bodyInput.value.trim();

    if (body.length === 0) {
      bodyError.textContent = 'Isi diperlukan';
      bodyInput.classList.add('invalid');
    } else {
      bodyError.textContent = '';
      bodyInput.classList.remove('invalid');
    }
  }

  onSubmit() {
    const titleInput = this.querySelector('#titleInput');
    const bodyInput = this.querySelector('#bodyInput');
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    this.validateTitle();
    this.validateBody();

    if (title.length > 0 && body.length > 0) {
        const newNote = {
            id: Date.now().toString(),
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false
        };

        this.dispatchEvent(new CustomEvent('noteAdded', { detail: newNote }));

        titleInput.value = '';
        bodyInput.value = '';

        this.showConfirmationDialog();
    }
}

showConfirmationDialog() {
    const confirmationDialog = document.createElement('div');
    confirmationDialog.classList.add('confirmation-dialog');
    confirmationDialog.innerHTML = `
        <p>Note Berhasil di tambahkan, check daftar note baru anda di bawah!</p>
    `;
    document.body.appendChild(confirmationDialog);

    setTimeout(() => {
        confirmationDialog.remove();
    }, 2000);
}

}