import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../services/accountAdmin.service";
import { AccountAdmin } from "../../interfaces/page";
import { useNavigate } from "react-router-dom";
import { setCheckAdmin } from "../../util";

export default function LoginAdmin() {
  /**
   * Get admin
   */
  const accountAdmin: AccountAdmin = useSelector((state: any) => {
    return state.admin.admins;
  });

  console.log(accountAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  /**
   * check admin
   */

  const [valueAccount, setValueAccount] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const navigate = useNavigate();

  const handleValueAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAccount(e.target.value);
  };

  const handleValuePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const handleLogin = () => {
    if (valueAccount !== accountAdmin.accountName) {
      alert("Account information or password is incorrect");
    } else if (valuePassword !== accountAdmin.accountPassword) {
      alert("Account information or password is incorrect");
    } else {
      localStorage.setItem("checkAdmin", JSON.stringify(accountAdmin));
      setValueAccount("");
      setValuePassword("");
      navigate("/admin");
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h2 className="mb-5">Sign in</h2>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      value={valueAccount}
                      onChange={handleValueAccount}
                      type="text"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Account
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input
                      value={valuePassword}
                      onChange={handleValuePassword}
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>
                  {/* Checkbox */}
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>
                  <button
                    onClick={handleLogin}
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
