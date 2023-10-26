import { isEditingChange } from "@/redux/features/tableSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { User } from "@/types/DataType";
import { ExitIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Edit = () => {
  const dataId = useAppSelector(
    (state) => state.tableReducer.value.editedDataId
  );
  const data = useAppSelector((state) => state.tableReducer.value.data);

  // Find the row in the data array with the given ID and set it as the editedData.
  const editedData = data.find((row: User) => row.id === dataId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: dataId,
      name: editedData?.name,
      email: editedData?.email,
      birthday_date: editedData?.birthday_date,
      phone_number: editedData?.phone_number,
    },
  });

  async function editData(updatedData: User) {
    console.log(updatedData);

    const apiEndpoint = `https://technical-task-api.icapgroupgmbh.com/api/table/${updatedData.id}/`;

    try {
      const response = await axios.put(apiEndpoint, updatedData);
      if (response.status === 200) {
        console.log("Data updated successfully!");
        // Optionally, update the local data state with the edited data.
      } else {
        console.error("Error updating data:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex items-center flex-col fixed top-12 bg-cover h-full w-screen bg-slate-900 bg-opacity-80 -mt-12 pt-20">
      <form
        onSubmit={handleSubmit((data) => {
          editData(data);
          dispatch(isEditingChange(false));
          location.reload();
        })}
        className="flex items-center flex-col border border-slate-700 rounded-xl p-5"
      >
        <ExitIcon
          className="self-end cursor-pointer"
          onClick={() => dispatch(isEditingChange(false))}
        />
        <div className="w-full">
          <label>Id</label>
          <input
            type="text"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("id")}
            readOnly
          />
          <p className="mb-5 mt-1 text-red-600">{errors.id?.message}</p>
        </div>

        <div className="w-full">
          <label>Name</label>
          <input
            type="text"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("name", {
              required: "This is required.",
              minLength: {
                value: 4,
                message: "Min length is 4",
              },
            })}
          />

          <p className="mt-1 text-red-600">{errors.name?.message}</p>
        </div>

        <div className="w-full">
          <label>Email</label>
          <input
            type="email"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("email", {
              required: "This is required.",
              minLength: {
                value: 4,
                message: "Min length is 4",
              },
            })}
          />

          <p className="mt-1 text-red-600">{errors.name?.message}</p>
        </div>

        <div className="w-full">
          <label>Birthday</label>
          <input
            type="date"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("birthday_date", {
              required: "This is required.",
            })}
          />

          <p className="mt-1 text-red-600">{errors.name?.message}</p>
        </div>

        <div className="w-full">
          <label>Phone number</label>
          <input
            type="phone_number"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("phone_number", {
              required: "This is required.",
              minLength: {
                value: 4,
                message: "Min length is 4",
              },
            })}
          />

          <p className="mt-1 text-red-600">{errors.phone_number?.message}</p>
        </div>

        <input
          className="w-40 mt-5 cursor-pointer bg-slate-100 text-black rounded-xl p-3 hover:bg-slate-300 ease-in duration-200"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Edit;
