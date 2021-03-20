import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorListActions } from "../../redux/actions/doctorListActions";
import "./_doctorlist.scss";
import maleDoc from "../../assets/pics/maleDoc.jpg";
import femaleDoc from "../../assets/pics/femaleDoc.jpg";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState(false);
  const dispatch = useDispatch();

  const { loading, doctorInfo } = useSelector((state) => state.doctorList);
  if (doctorInfo) {
    console.log(doctorInfo);
  }

  useEffect(() => {
    dispatch(doctorListActions());
  }, [dispatch]);

  return (
    <div className="doc-list-main">
      <div className="container">
        <h2 className="text-center m-2">Best Doctors Avialable For You</h2>

        {loading ? (
          <div
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          >
            <span
              class="spinner-grow spinner-grow-sm pr-2"
              style={{ color: "coral" }}
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        ) : (
          <div className="row">
            {doctorInfo
              ? doctorInfo.response.data.map((item, index) => (
                  <div className="col-md-4 " key={index}>
                    <Link to={{ pathname: `/${item.name}`, details: { item } }}>
                      <div className="doc-list m-2">
                        <div className="d-flex flex-column align-items-center">
                          {index % 2 === 0 ? (
                            <img
                              src={maleDoc}
                              alt="doc_pic"
                              className="image-class"
                            />
                          ) : (
                            <img
                              src={femaleDoc}
                              alt="doc_pic"
                              className="image-class"
                            />
                          )}

                          <h4>{item.name}</h4>
                          <p>{item.org}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
