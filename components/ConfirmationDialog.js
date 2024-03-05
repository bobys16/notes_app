export class ConfirmationDialog extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <div class="confirmation-dialog">
              <p>Are you sure you want to delete this note?</p>
              <button class="confirm-button">Yes</button>
              <button class="cancel-button">No</button>
          </div>
      `;
      this.querySelector('.confirm-button').addEventListener('click', this.handleConfirm.bind(this));
      this.querySelector('.cancel-button').addEventListener('click', this.handleCancel.bind(this));
  }

  handleConfirm() {
      this.dispatchEvent(new CustomEvent('confirmed'));
  }

  handleCancel() {
      this.dispatchEvent(new CustomEvent('canceled'));
  }
}

customElements.define('confirmation-dialog', ConfirmationDialog);
