import { html, render } from '../../deps/htm-preact.js';

function closeContentLake() {
  if (window.tabForContentLake) {
    window.tabForContentLake.close();
    window.tabForContentLake = null;
  }
}

function openContentLake() {
  window.tabForContentLake = window.open('http://localhost:3000/', '_blank');
}

function ContentLake() {
  const onClick = (e) => {
    document.querySelectorAll('.content-lake-content .content-lake-button').forEach((el) => {
      el.classList.toggle('hidden');
      el.classList.toggle('shown');
    });
  };

  return html`
    <div class=content-lake-heading>
      <p>Content Lake - Find Assets</p>
    </div>
    <div class="content-lake-content">
      <button class="content-lake-button close-button shown" onclick="${onClick}">Prepare Paste and Close Content Lake</button>
      <button class="content-lake-button open-button hidden" onclick="${onClick}">Show Content Lake</button>
    </div>
  `;
}

export default async function init(el) {
  render(html`<${ContentLake} />`, el);
  openContentLake();
  window.onbeforeunload = () => {
    closeContentLake();
  };
}
