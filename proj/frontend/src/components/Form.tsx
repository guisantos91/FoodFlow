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
                            <Label htmlFor="fname" value="Name" />
                        </div>
                        <TextInput className="w-full" id="fname" type="text" value={data.fname} placeholder={data.fname} readOnly required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lname" value="Surname" />
                        </div>
                        <TextInput className="w-full" id="lname" type="text" value={data.lname} placeholder={data.lname} readOnly required shadow />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="birthDate" value="Birth Date" />
                        </div>
                        <TextInput className="w-full" id="birthDate" type="text" value={data.birthDate} placeholder={data.birthDate} readOnly required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-full" id="email" type="email" value={data.email} placeholder={data.email} readOnly required shadow />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantName" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-full" id="restaurantName" type="text" value={data.restaurantName} placeholder={data.restaurantName} readOnly required shadow />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantAddress" value="Restaurant Address" />
                        </div>
                        <TextInput className="w-full" id="restaurantAddress" type="text" value={data.restaurantAddress} placeholder={data.restaurantAddress} readOnly required shadow />
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