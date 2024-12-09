import { FormData } from "../api/apiAdmin";
import { aproveForm, changeForm } from "../api/apiAdmin";

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
            } else if (state === "declined") {
                await changeForm(formId, updatedForm);
            }
            setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
        } catch (error) {
            console.error(`Failed to ${state} form in array:`, error);
        }
    } else {
        console.log("Single form mode:", { formId });
        const updatedForm = { ...(formId as FormData), state: state };
        console.log("Updated form for single form mode:", updatedForm);
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