import React, { memo } from 'react';
import { Filter } from '../Filter/Filter';

type Props = {
  filterStatus: string;
  onFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  amountOfItems: number;
};

export const Footer: React.FC<Props> = memo(({
  filterStatus,
  onFilterStatus,
  amountOfItems,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfItems} items left`}
      </span>

      <Filter filterStatus={filterStatus} onFilterStatus={onFilterStatus} />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
