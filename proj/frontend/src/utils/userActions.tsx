import { FormData } from "../api/apiAdmin";
import { aproveForm, changeForm } from "../api/apiAdmin";
import { redirect } from "react-router-dom";

export const handleForm = async (
    formId: number | FormData,
    forms: FormData[] | null,
    setForms: React.Dispatch<React.SetStateAction<FormData[]>> | null,
    state: "accepted" | "declined"
) => {
    if (forms && setForms && typeof formId === "number") {
        const form = forms.find((form) => form.id === formId);
        if (!form) {
            console.error("Form not found in array");
            return;
        }
        const updatedForm = { ...form, state };
        try {
            if (state === "accepted") {
                await aproveForm(updatedForm);
                redirect("/admin");
            } else if (state === "declined") {
                await changeForm(formId, updatedForm);
                redirect("/requests");
            }
            setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
        } catch (error) {
            console.error(`Failed to ${state} form in array:`, error);
        }
    } else {
        try {
            const updatedForm = { ...(formId as FormData), state: state };
            if (state === "accepted") {
                await aproveForm(updatedForm);
            } else if (state === "declined") {
                await changeForm((formId as FormData).id, updatedForm);
            }
            console.log(`Form ${state} successfully`);
        } catch (error) {
            console.error(`Failed to ${state} single form:`, error);
        }
    }
};