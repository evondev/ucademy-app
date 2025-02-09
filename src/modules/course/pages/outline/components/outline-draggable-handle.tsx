import { useContext } from 'react';

import { SortableItemContext } from './outline-draggable-item';

export interface OutlineDraggableHandleProps {}

export default function OutlineDraggableHandle(
  _props: OutlineDraggableHandleProps,
) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button
      {...attributes}
      {...listeners}
      ref={ref}
      className="cursor-grab"
    >
      <svg
        viewBox="0 0 20 20"
        width="12"
      >
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </button>
  );
}
