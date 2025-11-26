import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initDragDrop } from './dragdrop';
import Sortable from 'sortablejs';

// Mock SortableJS
vi.mock('sortablejs', () => {
  return {
    default: {
      create: vi.fn(),
    },
  };
});

describe('Drag and Drop Logic', () => {
  let container: HTMLElement;
  let onReorder: (order: number[]) => void;

  beforeEach(() => {
    document.body.innerHTML = '<div id="list"><div>Item 1</div><div>Item 2</div></div>';
    container = document.getElementById('list') as HTMLElement;
    onReorder = vi.fn();
    vi.clearAllMocks();
  });

  it('initializes Sortable with correct options', () => {
    initDragDrop(container, onReorder);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(Sortable.create).toHaveBeenCalledWith(container, {
      animation: 150,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onEnd: expect.any(Function),
    });
  });

  it('calls onReorder callback when drag ends', () => {
    initDragDrop(container, onReorder);

    // Get the options passed to Sortable.create
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockCreate = Sortable.create as ReturnType<typeof vi.fn>;

    const options = mockCreate.mock.calls[0][1] as { onEnd: () => void };

    // Simulate onEnd event
    // In real Sortable, it passes an event object, but we just need to verify our callback is called.
    // Our wrapper might extract new order from DOM.

    // Let's assume our wrapper extracts IDs from data attributes.
    container.innerHTML = `
      <div data-id="2">Item 2</div>
      <div data-id="1">Item 1</div>
    `;

    options.onEnd();

    expect(onReorder).toHaveBeenCalledWith([2, 1]);
  });
});
