import clsx from "clsx";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoadingTab } from "Slice/isLoadingTabSlice";
import { setPlaylistCurrent } from "Slice/playlistCurrentSlice";
import { setHistoryPage } from "app/services";
import "./ExploreSlideItem.scss";

function ExploreSlideItem({
  slide = {},
  order = 0,
  slideIndex = 0,
  listSlideLength = 0,
  isReverse = false,
}) {
  const secondSlideIndex = useMemo(() => {
    return slideIndex + 1 >= listSlideLength
      ? slideIndex + 1 - listSlideLength
      : slideIndex + 1;
  }, [slideIndex, listSlideLength]);

  const thirdSlideIndex = useMemo(() => {
    return slideIndex + 2 >= listSlideLength
      ? slideIndex + 2 - listSlideLength
      : slideIndex + 2;
  }, [slideIndex, listSlideLength]);

  const fourthSlideIndex = useMemo(() => {
    return slideIndex + 3 >= listSlideLength
      ? slideIndex + 3 - listSlideLength
      : slideIndex + 3;
  }, [slideIndex, listSlideLength]);
  const fifthSlideIndex = useMemo(() => {
    return slideIndex + 4 >= listSlideLength
      ? slideIndex + 4 - listSlideLength
      : slideIndex + 4;
  }, [slideIndex, listSlideLength]);

  const sixthSlideIndex = useMemo(() => {
    return slideIndex + 5 >= listSlideLength
      ? slideIndex + 5 - listSlideLength
      : slideIndex + 5;
  }, [slideIndex, listSlideLength]);

  const dispatch = useDispatch();

  return (
    <div
      className={clsx("col", "l-4", "m-4", "c-6", "explore__slide-item", {
        prev:
          (order === sixthSlideIndex && !isReverse) ||
          (order === fourthSlideIndex && isReverse),
        next:
          (order === thirdSlideIndex && !isReverse) ||
          (order === slideIndex && isReverse),
        first: order === slideIndex,
        second: order === secondSlideIndex,
        third: order === thirdSlideIndex,
        fourth: order === fourthSlideIndex,
        fifth: order === fifthSlideIndex,
        sixth:
          order !== slideIndex &&
          order !== secondSlideIndex &&
          order !== thirdSlideIndex &&
          order !== fourthSlideIndex &&
          order !== fifthSlideIndex,
      })}
    >
      <NavLink
        to={"/playlist/id=" + slide.encodeId}
        className="row__item-display"
        onClick={() => {
          dispatch(setIsLoadingTab(true));
          dispatch(setPlaylistCurrent(slide.encodeId));
          setHistoryPage({encodeId: slide.encodeId, page: "playlist"})
        }}
      >
        <div
          className="explore__slide-img row__item-img img--rec"
          style={{
            background: `url('${slide.banner}') no-repeat center center / cover`,
          }}
        ></div>
      </NavLink>
    </div>
  );
}

export default ExploreSlideItem;
