import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOverlay } from './overlay';
import { Scenario } from './dom-extract';
import * as DragDrop from './dragdrop';

// Mock DragDrop
vi.mock('./dragdrop', () => ({
  initDragDrop: vi.fn(),
}));

describe('Overlay UI', () => {
  let scenarios: Scenario[];
  let onReorder: (order: number[]) => void;

  beforeEach(() => {
    document.body.innerHTML = '';
    scenarios = [
      { id: 1, unlocked: true, complete: false, element: document.createElement('div') },
      { id: 2, unlocked: true, complete: false, element: document.createElement('div') },
    ];
    onReorder = vi.fn();
    vi.clearAllMocks();
  });

  it('renders overlay container and list items', () => {
    createOverlay(scenarios, onReorder);

    const overlay = document.querySelector('.frosthaven-overlay');
    expect(overlay).toBeTruthy();

    const items = overlay?.querySelectorAll('.scenario-item');
    expect(items).toHaveLength(2);
    expect(items?.[0].textContent).toContain('Scenario 1');
    expect(items?.[1].textContent).toContain('Scenario 2');
  });

  it('initializes drag and drop', () => {
    createOverlay(scenarios, onReorder);

    const list = document.querySelector('.scenario-list-container');
    expect(DragDrop.initDragDrop).toHaveBeenCalledWith(list, expect.any(Function));
  });

  it('triggers onReorder callback', () => {
    createOverlay(scenarios, onReorder);

    // Simulate callback from DragDrop
    const mockInitDragDrop = DragDrop.initDragDrop as ReturnType<typeof vi.fn>;
    const callback = mockInitDragDrop.mock.calls[0][1] as (order: number[]) => void;
    callback([2, 1]);

    expect(onReorder).toHaveBeenCalledWith([2, 1]);
  });
});
