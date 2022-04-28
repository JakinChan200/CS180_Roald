import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../../constants/backendURL";
import { UserContext } from "../../../contexts/UserContext";
import { Hover } from "../../Hover/Hover";
import "./PubForm.css";

export const PubForm: React.FC = () => {
  const [userName, setUserName] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>();
  const { setUser, videos } = React.useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(
        `${BACKEND_URL}/videos
      `,
        {
          userName,
        }
      )
      .then((res) => {
        setError(`Save successful for ${userName}.`);
        setUser({ userName: userName, videos: res.data });
      })
      .catch(() => {
        axios
          .post(`${BACKEND_URL}/register`, {
            userName,
          })
          .then(() => {
            setError("Registered as a new user. Save successful.");
          })
          .catch((err) => {
            setError(
              err +
                ". This data point will be shown in 'Experimental Metrics', but will not be saved."
            );
            setUser({
              videos: [...videos, time],
            });
            console.log("new vids", videos);
          });
      });
    e.preventDefault();
  };

  const handleDelete = () => {
    axios
      .post(`${BACKEND_URL}/user/delete`, {
        userName,
      })
      .then(() => {
        setError(`Delete successful for ${userName}`);
      })
      .catch((err) => {
        setError(err + `. Could not delete under ${userName}.`);
      });
    setUser({ videos: [] });
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
          onChange={(e) => setTime(e.target.value)}
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
        <Hover text="Optional. Used to save and retrieve results outside of this session." />
      </div>
      <br />
      <br />
      <div className="row">
        <button className="submit" type="submit">
          Save
        </button>
      </div>
      {userName.length > 0 && (
        <>
          <br />
          <br />
          <div className="row">
            <button className="submit" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
      <br />
      <br />
      {error && <p className="error">{error}</p>}
    </form>
  );
};
