import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanItem from '../KanbanItem/KanbanItem';

const initialColumns = {
  todo: {
    name: 'To Do',
    items: [{ id: '1', content: 'Task 1' }, { id: '2', content: 'Task 2' }],
  },
  inProgress: {
    name: 'In Progress',
    items: [{ id: '3', content: 'Task 3' }],
  },
  done: {
    name: 'Done',
    items: [{ id: '4', content: 'Task 4' }],
  },
};

const KanbanBoard = () => {

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(columns).map(([columnId, column], index) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-gray-100 p-4 m-2 rounded"
              style={{ minWidth: '250px' }}
            >
              <h2>{column.name}</h2>
              {column.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 m-2 bg-white rounded shadow"
                    >
                      <KanbanItem />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default KanbanBoard;