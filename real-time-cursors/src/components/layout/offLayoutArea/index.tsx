import React from "react";

import { useCursor } from "hooks/useCursor";
import { CustomCursor } from "components/customCursor";

export const OffLayoutArea: React.FC = () => {
  const { cursors } = useCursor();

  return (
    <>
      {cursors.map((cursor, index) => (
        <CustomCursor key={index} {...cursor} />
      ))}
    </>
  );
};
