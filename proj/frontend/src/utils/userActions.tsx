import { FormData } from "../api/apiAdmin";
import { aproveForm, changeForm } from "../api/apiAdmin";

export const handleForm = async (
    formId: number,
    forms: FormData[],
    setForms: React.Dispatch<React.SetStateAction<FormData[]>>,
    state: string
) => {
    const form = forms.find((form) => form.id === formId);
    if (!form) {
        console.error("Form not found");
        return;
    }
    const newForm = { ...form, state: state };
    try {
        if (state === "accepted") {
            await aproveForm(newForm);
        } else if (state === "declined") {
            await changeForm(formId, newForm);
        }
        setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    } catch (error) {
        console.error("Failed to accept form:", error);
    }
};