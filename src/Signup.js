import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  emailContainer: {
    width: "150px",
    height: "50px",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 18px",
    fontSize: "18px",
    border: "1px solid #E3E1E1",

    color: "rgb(51, 49, 47)",
    paddingLeft: "25px",
    fontFamily: "Graphik",
    paddingRight: "32px",
    background: "rgb(255, 255, 255)",
    borderRadius: "100px",

    outline: "none",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
  },
  button: {
    // width: "124px",
    height: "55px",
    fontFamily: "Graphik",
    marginLeft: "10px",
    // marginLeft: "10px",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 18px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "18px",
    color: "rgb(255, 255, 255)",
    background: "#59BAAE",
    borderRadius: "100px",
    borderWidth: "0px",
    padding: " 16px 24px",
    outline: "none",
  },
  subtext: {
    fontSize: "24px",
    // lineHeight: "36px",
    color: "rgb(51, 49, 47)",
    opacity: "0.6",
    maxWidth: "350px",
    marginTop: "30px",
    marginBottom: "28px",
    textAlign: "left",
  },
}));

export default () => {
  const classes = useStyles();
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [inputs, setInputs] = useState({
    email: "",
    message: "",
  });
  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: "",
        message: "",
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };
  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: "POST",
      url: "https://formspree.io/mnqvdpna",
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          "Thank you! You are signed up for our app launch"
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input
          className={classes.emailContainer}
          id="email"
          type="email"
          name="_replyto"
          placeholder="Your email"
          onChange={handleOnChange}
          required
          value={inputs.email}
        />

        <button
          type="submit"
          className={classes.button}
          disabled={status.submitting}
        >
          {!status.submitting
            ? !status.submitted
              ? "Sign up"
              : "Success!"
            : "One sec..."}
        </button>
      </form>
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </>
  );
};
