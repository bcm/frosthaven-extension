import { Scenario } from './dom-extract';
import { initDragDrop } from './dragdrop';

export function createOverlay(scenarios: Scenario[], onReorder: (order: number[]) => void) {
  // Create container
  const overlay = document.createElement('div');
  overlay.className = 'frosthaven-overlay';

  const title = document.createElement('h2');
  title.textContent = 'Scenario Backlog';
  overlay.appendChild(title);

  const listContainer = document.createElement('div');
  listContainer.className = 'scenario-list-container';

  scenarios.forEach((scenario) => {
    const item = document.createElement('div');
    item.className = 'scenario-item';
    item.textContent = `Scenario ${scenario.id}`;
    item.setAttribute('data-id', scenario.id.toString());
    listContainer.appendChild(item);
  });

  overlay.appendChild(listContainer);
  document.body.appendChild(overlay);

  // Initialize drag and drop
  initDragDrop(listContainer, onReorder);
}
