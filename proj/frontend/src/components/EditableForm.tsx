import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { changeManager, ManagerData } from "../api/apiAdmin";

interface FormProps {
    data: ManagerData;
}


export function Form({data}: FormProps) {
  const navigate = useNavigate();

  const [managerData, setManagerData] = useState<ManagerData>({
    id: data.id,
    fname: data.fname,
    lname: data.lname,
    birthDate: data.birthDate,
    email: data.email,
  });

  const handleChange = (field: keyof ManagerData, value: string) => {
    setManagerData((prevData: any) => ({
        ...prevData,
        [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Manager Data:", managerData);
    changeManager(data.id, managerData);
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center rounded-3xl w-full max-w-5xl shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mb-4">
                <div className="flex border-b-2 border-gray-400 mt-4">
                    <h1 className="flex text-4xl font-bold mb-8 ml-12">Edit Manager Information</h1>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="fname" value="Name" />
                        </div>
                        <TextInput className="w-full" id="fname" type="text" placeholder={data.fname} onChange={(e) => handleChange("fname", e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lname" value="Surname" />
                        </div>
                        <TextInput className="w-full" id="lname" type="text" placeholder={data.lname} onChange={(e) => handleChange("lname", e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="birthDate" value="Birth Date" />
                        </div>
                        <TextInput className="w-full" id="birthDate" type="text" placeholder={data.birthDate} onChange={(e) => handleChange("birthDate", e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-full" id="email" type="email" placeholder={data.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Button className="bg-blue-600 w-48 rounded-2xl" type="button" onClick={() => { handleSave() }} >Save</Button>
                </div>
            </form>
        </div>
    </div>
  );
}