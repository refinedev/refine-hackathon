import React from "react";

import { TitleProps } from "@pankod/refine";

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <>
    {collapsed ? (
      <img
        src={"/refine-collapsed.svg"}
        alt="Refine"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 24px",
        }}
      />
    ) : (
      <img
        src={"/refine.svg"}
        alt="Refine"
        style={{
          width: "200px",
          padding: "12px 24px",
        }}
      />
    )}
  </>
);
