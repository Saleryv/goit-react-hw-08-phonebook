    import axios from "axios"
    const contactsAPI = axios.create({
    baseURL: "https://63d118ae3f08e4a8ff905f21.mockapi.io/Contacts/",
    })

    export const allContacts = async() => {
        const { data }  = await contactsAPI.get();
    return data;
    };

    export const deleteContacts = async(id) => {
        const { data }  = await contactsAPI.delete(`${id}`);
        return data;
    };

    export const addContacts = async(contact) => {
        const { data }  = await contactsAPI.post('',contact);
        return data;
    };

