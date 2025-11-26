import Sortable from 'sortablejs';

export function initDragDrop(container: HTMLElement, onReorder: (order: number[]) => void) {
    Sortable.create(container, {
        animation: 150,
        onEnd: () => {
            const order: number[] = [];
            const children = Array.from(container.children) as HTMLElement[];
            children.forEach(child => {
                const id = child.getAttribute('data-id');
                if (id) {
                    order.push(parseInt(id, 10));
                }
            });
            onReorder(order);
        }
    });
}
