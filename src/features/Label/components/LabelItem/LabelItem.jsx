import React from "react";

function LabelItem({ label }) {
  const { banner } = label;
  return (
    <div className="row__item item--label">
      <div className="row__item-container flex--top-left">
        <div className="row__item-display br-5">
          <div
            className="row__item-img img--label"
            style={{
              background: `url('${banner}') no-repeat center center / cover`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LabelItem;
