import React, { useState } from "react";
import avatar from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useDispatch } from "react-redux";

export default function Username() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/profile");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h6 className="text-4xl font-bold">Hello Again!</h6>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore More by Connecting With Us.
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={styles.profileImage} src={avatar} alt="avatar" />
            </div>

            <div className={styles.box}>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.textbox}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.textbox}
              />
              <button type="submit" className={styles.btn}>
                Let's Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
