import React, { Component } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import { FormTitle, FormSubtitle } from "./components/Phonebook.styled";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  formSubmitHandler = (data) => {
    const { name, number } = data;
    const addedContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (addedContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState((prevState) => {
      return {
        contacts: [
          { name: name, id: nanoid(), number: number },
          ...prevState.contacts,
        ],
      };
    });
  };

  filterHandler = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  findContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  render() {
    const findedContacts = this.findContacts();
    return (
      <div className="App">
        <FormTitle>Phonebook</FormTitle>
        <Form onSubmit={this.formSubmitHandler}></Form>

        <FormSubtitle>Contacts</FormSubtitle>
        <Filter
          value={this.state.filter}
          onChange={this.filterHandler}
        ></Filter>
        <Contacts
          contacts={findedContacts}
          deleteContact={this.deleteContact}
        ></Contacts>
      </div>
    );
  }
}

export default App;
