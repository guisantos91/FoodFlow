import { Button, Label, TextInput } from "flowbite-react";

export function Form() {
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
                        <TextInput className="w-96" id="name" type="text" placeholder="Enter your name" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="surname" value="Surname" />
                        </div>
                        <TextInput className="w-96" id="surname" type="text" placeholder="Enter your surname" required shadow />
                    </div>
                </div>
                <div className="flex items-center justify-center ml-4 space-x-20">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Birth Date" />
                        </div>
                        <TextInput className="w-96" id="date" type="text" placeholder="DD - MM - YYYY" required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput className="w-96" id="email" type="email" placeholder="example@domain.com" required shadow />
                    </div>
                </div>
                <div className="ml-12">
                    <div className="mb-2 block">
                        <Label htmlFor="credential" value="Credential" />
                    </div>
                    <div className="flex items-center gap-12">
                        <TextInput className="w-96" id="credential" type="text" placeholder="Enter your credential" required shadow />
                        <Button className="bg-orange-500 w-48 rounded-2xl" color="orange">Generate</Button>
                    </div>
                </div>
                <div className="ml-12">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <div className="flex items-center gap-12">
                        <TextInput className="w-96" id="password" type="password" placeholder="Enter your password" required shadow />
                        <Button className="bg-orange-500 w-48 rounded-2xl" color="orange">Generate</Button>
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