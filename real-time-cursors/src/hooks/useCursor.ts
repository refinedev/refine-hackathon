import { useEffect, useState } from "react";
import {
  useSubscription,
  usePublish,
  useGetIdentity,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import throttle from "lodash/throttle";

const { useLocation } = routerProvider;

type CursorType = { username: string; x: number; y: number };

export const useCursor = () => {
  const [cursors, setCursors] = useState<CursorType[]>([]);

  const { pathname } = useLocation();
  const { data: user } = useGetIdentity<{ username: string }>();
  const publish = usePublish();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!user) return;

      publish?.({
        channel: `active-cursors${pathname}`,
        type: "change",
        payload: {
          username: user.username,
          x: e.clientX,
          y: e.clientY,
        },
        date: new Date(),
      });

      setCursors((prevCursors) => {
        const nextCursors = prevCursors.filter(
          (c) => c.username !== user.username
        );
        return nextCursors;
      });
    };

    window.addEventListener("mousemove", throttle(handleMouseMove, 500));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (!user) return;

      publish?.({
        channel: `active-cursors${pathname}`,
        type: "remove",
        payload: {
          username: user.username,
        },
        date: new Date(),
      });


    };
  }, [publish, user, pathname]);

  useSubscription({
    channel: `active-cursors${pathname}`,
    types: ["*"],
    onLiveEvent: ({ type, payload }) => {
      switch (type) {
        case "add":
        case "change":
          setCursors((prevCursors) => {
            const newCursors = [...prevCursors];
            const index = newCursors.findIndex(
              (c) => c.username === payload.username
            );

            if (index === -1) {
              newCursors.push(payload as CursorType);
            } else {
              newCursors[index] = payload as CursorType;
            }

            return newCursors;
          });
          break;
        case "remove":
          setCursors((prevCursors) => {
            const nextCursors = prevCursors.filter(
              (c) => c.username !== payload.username
            );
            return nextCursors;
          });
          break;
        default:
          break;
      }
    },
  });

  const cursorsWithoutActiveUser = cursors.filter(
    (c) => c.username !== user?.username
  );

  return { cursors: cursorsWithoutActiveUser };
};
