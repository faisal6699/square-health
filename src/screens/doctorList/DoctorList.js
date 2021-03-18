import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorListActions } from "../../redux/actions/doctorListActions";
import "./_doctorlist.scss";
import maleDoc from "../../assets/pics/maleDoc.jpg";
import femaleDoc from "../../assets/pics/femaleDoc.jpg";

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

      
        <h2 className='text-center m-2'>Best Doctors Avialable For You</h2>
        <div className="row">
          {doctorInfo
            ? doctorInfo.response.data.map((item, index) => (
                <div className="col-md-4 " key={index}>
                  <div className="doc-list m-2">
                    <div className="d-flex flex-column align-items-center">
                      {index % 2 === 0 ? (
                        <img src={maleDoc} alt="doc_pic" className='image-class'/>
                      ) : (
                        <img src={femaleDoc} alt="doc_pic" className='image-class'/>
                      )}

                      <h4>{item.name}</h4>
                      <p>{item.org}</p>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
