import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { StyledForm, FormLabel, FormInput, FormBtn } from "./Phonebook.styled";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      number: this.state.number,
    });
    this.reset();
  };

  reset() {
    this.setState({ name: "", number: "" });
  }

  render() {
    return (
      <Fragment>
        <StyledForm onSubmit={this.handleSubmit}>
          <FormLabel>
            Name
            <FormInput
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormLabel>
          <FormLabel>
            Number
            <FormInput
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </FormLabel>
          <FormBtn type="submit">Add contact</FormBtn>
        </StyledForm>
      </Fragment>
    );
  }
}
Form.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
export default Form;
