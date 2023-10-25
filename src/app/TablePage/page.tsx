"use client";
import axios from "axios";
import { useEffect } from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useDispatch } from "react-redux";
import { User } from "@/types/DataType";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { saveData } from "@/redux/features/tableSlice";
import Edit from "@/components/Edit";

async function getData(): Promise<User[]> {
  const apiUrl = "https://technical-task-api.icapgroupgmbh.com/api/table/";

  try {
    const response = await axios.get(apiUrl); // Очікуємо результат запиту

    if (response.status === 200) {
      return [...response.data.results]; // Повертаємо дані із відповіді
    } else {
      console.error("Помилка при отриманні даних з API:", response.status);
      return []; // Повертаємо пустий масив у випадку помилки
    }
  } catch (error) {
    console.error("Помилка при отриманні даних з API:", error);
    return []; // Повертаємо пустий масив у випадку помилки
  }
}

export default function TablePage() {
  const dispatch = useDispatch<AppDispatch>();

  const reduxData = useAppSelector((state) => state.tableReducer.value.data);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      dispatch(saveData(fetchedData));
    };

    fetchData(); // Викликаємо функцію отримання даних при завантаженні сторінки
  }, []);

  const isEditing = useAppSelector(
    (state) => state.tableReducer.value.isEditing
  );

  return (
    <div className="bg-cover h-fit ">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={reduxData} />
      </div>
      {isEditing && <Edit />}
    </div>
  );
}
