import { Button, Label, TextInput } from "flowbite-react";

interface FormData {
    fname: string;
    lname: string;
    email: string;
    birthDate: string;
    restaurantName: string;
    restaurantAddress: string;
}[]

interface FormProps {
    data: FormData;
}

export function Form({data}: FormProps) {

  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center mt-8 rounded-3xl w-1/2 shadow-lg bg-gray-200">
            <form className="flex w-full flex-col gap-6 mt-8 mb-4">
                <div className="flex border-b-2 border-gray-400">
                    <h1 className="flex text-4xl font-bold mb-8 ml-12">New Manager Request</h1>
                </div>
                <div className="flex items-center justify-center mt-8 ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput className="w-96" id="name" type="text" value={data.fname} placeholder={data.fname} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="surname" value="Surname" />
                        </div>
                        <TextInput className="w-96" id="surname" type="text" value={data.lname} placeholder={data.lname} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Birth Date" />
                        </div>
                        <TextInput className="w-96" id="date" type="text" value={data.birthDate} placeholder={data.birthDate} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-96" id="email" type="email" value={data.email} placeholder={data.email} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="restname" value="Restaurant Name" />
                        </div>
                        <TextInput className="w-96" id="restName" type="text" value={data.restaurantName} placeholder={data.restaurantName} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="restAddress" value="Restaurant Address" />
                        </div>
                        <TextInput className="w-96" id="restAddress" type="text" value={data.restaurantAddress} placeholder={data.restaurantAddress} required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4 gap-12">
                    <Button className="bg-green-500 w-48 rounded-2xl" type="submit">Accept</Button>
                    <Button className="bg-red-500 w-48 rounded-2xl"type="button">Decline</Button>
                </div>
            </form>
        </div>
    </div>
  );
}