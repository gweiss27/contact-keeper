import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Jonathan Weiss",
                email: "jonathan.b.weiss@gmail.com",
                phone: "770-490-8852",
                type: "personal"
            },
            {
                id: 2,
                name: "Joel Kennedy",
                email: "joelkennedy@yahoo.com",
                phone: "240-308-2169",
                type: "personal"
            },
            {
                id: 3,
                name: "Allison Sherman",
                email: "weissa40@hotmail.com",
                phone: "954-663-1836",
                type: "personal"
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADD Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    };

    // DELETE Contact

    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    };

    // SET Current Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    };

    // CLEAR Current Contact

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };

    // UPDATE Current Contact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    };

    // FILTER Contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    // CLEAR Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
