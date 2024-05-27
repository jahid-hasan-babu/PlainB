import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="container mt-5">
      <div className="card p-5 rounded-3">
        <h6>Customer Details</h6>
        <hr />
        <div className="row mb-4">
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>

          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
        </div>

        <h6>Shipping Details</h6>
        <hr />
        <div className="row">
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3 p-2">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
