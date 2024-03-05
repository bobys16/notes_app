export class CustomNavbar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      container.innerHTML = `
        <style>
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-image: linear-gradient(to right, #5F5D9C, #6196A6, #A4CE95, #F4EDCC);
            backdrop-filter: blur(10px);
            padding: 10px; /* Adjusted padding */
            color: white;
            z-index: 1000;
          }
        </style>
        <div class="navbar">
          <h1>Notes App</h1>
        </div>
      `;
      shadow.appendChild(container);
    }
  }
