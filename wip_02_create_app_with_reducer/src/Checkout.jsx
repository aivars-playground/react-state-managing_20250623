import React, { useState } from "react";
import {saveShippingAddress} from "./services/shippingService";
import {useMyCustomCartContextHook} from "./cartContext";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
}

export default function Checkout() {

  const {dispatch} = useMyCustomCartContextHook();


  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState([]);

  //derived state... we do not need STATUS.error
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist(); //react persist the event.... pre react 17????
    setAddress((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  function handleBlur(event) {
    event.persist();
    setTouched((prevState) => {
      return {...prevState, [event.target.id]: true}}
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();  //????????prevent second post????
    setStatus(STATUS.SUBMITTING)
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({type: "emptyCart"})
        setStatus(STATUS.COMPLETED)
      } catch (error) {
        setSaveError(error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address) {
    const result = {}

    if (!address.city) result.city="City is required"
    if (!address.country) result.country="City is required"
    return result;
  }


  if (saveError) throw saveError

  if (status === STATUS.COMPLETED) {
    return (
      <h1>thanks</h1>
    )
  }

  return (
    <>
      <h1>Shipping Info</h1>

      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>fix errors:</p>
          <ul>
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
