import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalDirectory from "../../Utilities/ModalDirectory";
import ItemDirectory from "./ItemDirectory";

const ContentDirectories = ({ classActive }) => {
  const directories = useAppSelector(store => store.tasks.directories);
  const [modalDirIsShown, setModalDirIsShown] = useState(false);

  const dispatch = useAppDispatch();

  const createNewDirectoryHandler = (inputValue) => {
    const newDirectoryName = inputValue.trim();

    if (newDirectoryName.length === 0) return;

    const directoryDoesNotExist = directories.every(
      (dir) => dir !== newDirectoryName
    );

    if (directoryDoesNotExist) {
      dispatch(tasksActions.createDirectory(newDirectoryName));
    }
  };

  const closeModalDirectoryHandler = () => {
    setModalDirIsShown(false);
  };

  return (
    <>
      {modalDirIsShown && (
        <ModalDirectory
          onClose={closeModalDirectoryHandler}
          onConfirm={createNewDirectoryHandler}
          btnText="Create"
          title="Create new directory"
        />
      )}

      <ul className="max-h-36 overflow-auto">
        {directories.map((dir) => (
          <ItemDirectory key={dir} classActive={classActive} dir={dir} />
        ))}
      </ul>
      <button
        onClick={() => setModalDirIsShown(true)}
        className="px-3 py-1 border-slate-300 dark:border-slate-700 border-2 ml-9 mt-2 rounded-md border-dashed hover:text-violet-500"
      >
        + New
      </button>
    </>
  );
};

export default ContentDirectories;
