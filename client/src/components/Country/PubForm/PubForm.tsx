import axios from "axios";
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { BACKEND_URL } from "../../../constants/backendURL";
import { Hover } from "../../Hover/Hover";
import "./PubForm.css";

interface PubFormProps {
  setResults: Dispatch<SetStateAction<any[]>>;
}

export const PubForm: React.FC<PubFormProps> = ({ setResults }) => {
  const [userName, setUserName] = React.useState<string | null>();
  const [pass, setPass] = React.useState<string | null>();
  const [error, setError] = React.useState<string | null>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(`${BACKEND_URL}/user`, {
        userName,
        pass,
      })
      .then((res) => {
        setError(`Save successful for ${userName}.`);
        setResults(res.data);
      })
      .catch(() => {
        axios
          .post(`${BACKEND_URL}/register`, {
            userName,
            pass,
          })
          .then(() => {
            setError("Registered as a new user. Save successful.");
          })
          .catch((err) => {
            setError(
              err +
                ". This data point will be shown in 'Experimental Metrics', but will not be saved."
            );
          });
      });
    e.preventDefault();
  };

  return (
    <form className="formContain" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <label>publish time</label>
        <input
          type="datetime-local"
          id="pubtime"
          name="pubtime"
          required
          onChange={(e) => setResults([e.target.value])}
        ></input>
      </div>
      <br />
      <br />
      <div className="row">
        <label>username</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <Hover text="Optional. Used to save and retrieve results in combination with a password." />
      </div>
      <br />
      <br />
      <div className="row">
        <label>password</label>
        <input type="text" onChange={(e) => setPass(e.target.value)}></input>
        <Hover text="Optional. Used to save and retrieve results with username." />
      </div>
      {userName && pass && (
        <>
          <br />
          <br />
          <div className="row">
            <button className="submit" type="submit">
              Save
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </>
      )}
    </form>
  );
};
