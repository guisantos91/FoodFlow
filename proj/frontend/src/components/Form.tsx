import { Button, Label, TextInput } from "flowbite-react";
import { FormData } from "../api/apiAdmin";
import { handleForm } from "../utils/userActions";

interface FormProps {
    data: FormData;
}

export function Form({data}: FormProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center rounded-3xl w-full max-w-5xl shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mb-4">
                <div className="flex border-b-2 border-gray-400">
                    <h1 className="flex text-4xl font-bold mb-8 ml-12">New Manager Request</h1>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="fname" value="Name" />
                        </div>
                        <TextInput className="w-full" id="fname" type="text" placeholder={data.fname} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lname" value="Surname" />
                        </div>
                        <TextInput className="w-full" id="lname" type="text" placeholder={data.lname} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="birthDate" value="Birth Date" />
                        </div>
                        <TextInput className="w-full" id="birthDate" type="text" placeholder={data.birthDate} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-full" id="email" type="email" placeholder={data.email} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantName" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-full" id="restaurantName" type="text" placeholder={data.restaurantName} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantAddress" value="Restaurant Address" />
                        </div>
                        <TextInput className="w-full" id="restaurantAddress" type="text" placeholder={data.restaurantAddress} disabled readOnly />
                    </div>
                </div>
                <div className="flex flex-wrap gap-10 px-8">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="foodchainName" value="Foodchain Name" />
                        </div>
                        <TextInput className="w-full" id="foodchainName" type="text" placeholder={data.foodchain.name} disabled readOnly />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="restaurantEndpoint" value="Restaurant Endpoint" />
                        </div>
                        <TextInput className="w-full" id="restaurantEndpoint" type="text" placeholder={data.restaurantEndpoint} disabled readOnly />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 gap-12">
                    <Button className="bg-green-500 w-48 rounded-2xl" type="button" onClick={() => handleForm(data, null, null, "accepted")} >Accept</Button>
                    <Button className="bg-red-500 w-48 rounded-2xl"type="button" onClick={() => handleForm(data, null, null, "declined")} >Decline</Button>
                </div>
            </form>
        </div>
    </div>
  );
}