import React, { useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

const InputCheckbox = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
  const directories = useAppSelector((state) => state.tasks.directories);

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState(() => {
    if (task) {
      return task.description;
    }
    return "";
  });
  const [title, setTitle] = useState(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState(() => {
    if (task) {
      return task.date;
    }
    return todayDate;
  });
  const isTitleValid = useRef(false);
  const isDateValid = useRef(false);

  const [isImportant, setIsImportant] = useState(() => {
    if (task) {
      return task.important;
    }
    return false;
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    if (task) {
      return task.completed;
    }
    return false;
  });

  const [selectedDirectory, setSelectedDirectory] = useState(() => {
    if (task) {
      return task.dir;
    }
    return directories[0];
  });

  const addNewTaskHandler = (event) => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTask = {
        title: title,
        dir: selectedDirectory,
        description: description,
        date: date,
        completed: isCompleted,
        important: isImportant,
        id: task?.id ? task.id : Date.now().toString(),
      };
      onConfirm(newTask);
      onClose();
    }
  };
  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        onSubmit={addNewTaskHandler}
      >
        <label>
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          Description (optional)
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
        </label>
        <label>
          Select a directory
          <select
            className="block w-full"
            value={selectedDirectory}
            onChange={({ target }) => setSelectedDirectory(target.value)}
          >
            {directories.map((dir) => (
              <option
                key={dir}
                value={dir}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {dir}
              </option>
            ))}
          </select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
