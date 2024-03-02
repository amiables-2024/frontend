import react, { useState } from 'react';

const KanbanItem = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="bg-white border-2 border-gray-300 rounded-xl flex flex-col content-start p-2 shadow-lg w-full cursor-grab">
        <div className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg md:flex items-center justify-center text-sm text-black font-semibold">
          Title
        </div>
        <div className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg flex items-center justify-center text-sm text-black">
          Assignee: Assignee Name
        </div>
        <div className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg flex items-center justify-center text-sm text-black">
          <span>Priority:</span>
          <span className="bg-green-300 ml-2 px-2 py-1 rounded-full">3</span>
        </div>
      </div>
    </div>
  );
}

export default KanbanItem;