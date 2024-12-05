import { Button, Label, TextInput } from "flowbite-react";
import { FormData } from "../api/apiAdmin";
import { handleForm } from "../utils/userActions";
import { useState } from 'react';

interface FormProps {
    data: FormData;
}

export function Form({data}: FormProps) {
  const [forms, setForms] = useState<FormData[]>([]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center rounded-3xl w-full max-w-5xl shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mt-8 mb-4">
                <div className="flex border-b-2 border-gray-400">
                    <h1 className="flex text-4xl font-bold mb-8 ml-12">New Manager Request</h1>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput className="w-full" id="name" type="text" value={data.fname} placeholder={data.fname} required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="surname" value="Surname" />
                        </div>
                        <TextInput className="w-full" id="surname" type="text" value={data.lname} placeholder={data.lname} required shadow />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Birth Date" />
                        </div>
                        <TextInput className="w-full" id="date" type="text" value={data.birthDate} placeholder={data.birthDate} required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-full" id="email" type="email" value={data.email} placeholder={data.email} required shadow />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restname" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-full" id="restName" type="text" value={data.restaurantName} placeholder={data.restaurantName} required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restAddress" value="Restaurant Address" />
                        </div>
                        <TextInput className="w-full" id="restAddress" type="text" value={data.restaurantAddress} placeholder={data.restaurantAddress} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 gap-12">
                    <Button className="bg-green-500 w-48 rounded-2xl" type="submit" onClick={() => handleForm(data.id, forms, setForms, "accepted")} >Accept</Button>
                    <Button className="bg-red-500 w-48 rounded-2xl"type="button" onClick={() => handleForm(data.id, forms, setForms, "declined")} >Decline</Button>
                </div>
            </form>
        </div>
    </div>
  );
}