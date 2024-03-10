// Dependencies
import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated, easings } from "react-spring";
import "./tailwind.output.css";
import Pill from "./pill";

const SPACING_BETWEEN_PILLS = 8;
const SPACING_OFFSET = 2;

interface PillContainerProps {
  titles: string[];
}

const PillContainer: React.FC<PillContainerProps> = ({titles}) => {
  const [pills, setPills] = useState(titles.map((title) => ({ title, selected: false, left: 0 })));
  const pillRefs = useRef<(HTMLDivElement | null)[]>(new Array(titles.length));

  useEffect(() => {
    let accumWidth = 0; // Accumulated width to position each pill next to the previous one

    // Iterate starting from the first pill since you might need to reset positions based on dynamic widths
    for (let index = 0; index < pillRefs.current.length; index++) {
        const pillRef = pillRefs.current[index];
        if (pillRef) {
            const newLeft = accumWidth; // Set the left position based on the accumulated width
            // Directly update state for the pill to include the new left value
            const _filters = [...pills];
            _filters[index].left = newLeft;
            setPills(_filters);

            accumWidth += pillRef.offsetWidth + SPACING_BETWEEN_PILLS; // Add the current pill's width and spacing to the accumulated width
        }
    }
  }, [pills.length, pills[0]?.selected]); // Dependency on pills.length and the selected state of the first pill, adjust as needed


  const onPillClick = (index : number) => (_e: React.MouseEvent) => {
    const _pills = [...pills];
    const isFirst = index === 0;
    const islast = index === _pills.length - 1;

    // if [nextPillIsSelected is true or prevPillIsSelected is true]
    // then the pill was or will be part of a selected group
    const nextPillIsSelected = !islast && _pills[index + 1].selected;
    const prevPillIsSelected = !isFirst && _pills[index - 1].selected;

    //[STEP I] hanlde pills positions
    // we want to create a chain/rope like effect
    // whereby when we move a certain pill
    // the following ones follow it to the appropriate postion
    if (!_pills[index].selected) {
      //pill is about to be selected

      if (nextPillIsSelected) {
        for (let i = index + 1; i < pillRefs.current.length; i++) {
          if (pillRefs.current[i]) {
            _pills[i].left -= SPACING_BETWEEN_PILLS + SPACING_OFFSET;
          }
        }
      }
      if (prevPillIsSelected) {
        for (let i = index; i < pillRefs.current.length; i++) {
          if (pillRefs.current[i]) {
            _pills[i].left -= SPACING_BETWEEN_PILLS + SPACING_OFFSET;
          }
        }
      }
    } else {
      // the pill is about to be unselected
      if (nextPillIsSelected) {
        for (let i = index + 1; i < pillRefs.current.length; i++) {
          if (pillRefs.current[i]) {
            _pills[i].left += SPACING_BETWEEN_PILLS + SPACING_OFFSET;
          }
        }
      }
      if (prevPillIsSelected) {
        for (let i = index; i < pillRefs.current.length; i++) {
          if (pillRefs.current[i]) {
            _pills[i].left += SPACING_BETWEEN_PILLS + SPACING_OFFSET;
          }
        }
      }
    }

    _pills[index].selected = !_pills[index].selected;

    //[STEP II] hanlde border radius and border width
    setBorderRadiuos(_pills);

    setPills(_pills);
  };

  const setBorderRadiuos = (_pills: string | any[]) => {
    // this function handles rounding corners accordignly
    // so if an elemnt from a selected group is
    // [Right most element] only round(top-righ && bottom-right)
    // [left most element] only round(top-left && bottom-left)
    // [for elemnts in the middle] don't apply in rounding of corners

    //[STEP 1 ] is to create a 2D array of selected pillsRefs group
    // example [[pillDomRef,pillDomRef][pillDomRef,pillDomRef...]...]
    let selectedPillsGroups = []; //this will hold groups of selected element refs
    let selectedLonePills: { classList: any; }[] = [];
    let unselectedPillsRefs: { classList: any; }[] = [];
    //group by selected
    const pillsLength = _pills.length;
    let currentSelectedGroupIndex = 0;
    for (let i = 0; i < pillsLength; i++) {
      const pill = _pills[i];

      const previousPillIsSelected = i > 0 && _pills[i - 1].selected;
      const nextPillIsSelected = i < pillsLength - 1 && _pills[i + 1].selected;
      if (pill.selected && (previousPillIsSelected || nextPillIsSelected)) {
        if (selectedPillsGroups.length) {
          // checking if we are still on the same group of pills
          console.log({ currentSelectedGroupIndex });
          console.log(selectedPillsGroups.length);
          const isNewSelectedPillsGroup =
            currentSelectedGroupIndex !== selectedPillsGroups.length - 1;
          if (isNewSelectedPillsGroup)
            selectedPillsGroups.push([pillRefs.current[i]]);
          else
            selectedPillsGroups[currentSelectedGroupIndex].push(
              pillRefs.current[i]
            );
        } else selectedPillsGroups.push([pillRefs.current[i]]);
      }

      //Im making a redudant if statment to make things readable :c
      if (pill.selected && !previousPillIsSelected && !nextPillIsSelected) {
        if (pillRefs.current[i]) {
          selectedLonePills.push(pillRefs.current[i] as HTMLDivElement);
        }
      }

      if (!pill.selected) {
        // only increment groupIndex if we have moved from a selected
        // pills group to an unselected pill
        if (selectedPillsGroups.length) currentSelectedGroupIndex++;

        unselectedPillsRefs.push(pillRefs.current[i] as HTMLDivElement);
      }
    }

    //[STEP 2] add the appropriate border-radius and broder-width classes
    for (let i = 0; i < selectedPillsGroups.length; i++) {
      const selectedGroup = selectedPillsGroups[i];
      const selectedGroupLength = selectedGroup.length;

      for (let j = 0; j < selectedGroupLength; j++) {
        const pillRef = selectedGroup[j] as HTMLElement;
        if (pillRef) {
          pillRef.classList.remove("rounded-3xl");
          pillRef.classList.remove("rounded-l-3xl");
          pillRef.classList.remove("rounded-r-3xl");
        }

        if (j === 0) {
          // left moset pill
          pillRef.classList.add("border-l-2");
          pillRef.classList.remove("border-r-2");
          pillRef.classList.add("rounded-l-3xl");
        } else if (j === selectedGroupLength - 1) {
          // right most pill
          pillRef.classList.add("border-r-2");
          pillRef.classList.remove("border-l-2");
          pillRef.classList.add("rounded-r-3xl");
        } else {
          pillRef.classList.remove("border-l-2");
          pillRef.classList.remove("border-r-2");
        }
      }
    }

    // [STEP 3] reassign full border radius and border width of 2 to unselected pills
for (let i = 0; i < unselectedPillsRefs.length; i++) {
  const pillRef = unselectedPillsRefs[i]; // Get a reference to the current pill
  
  // Ensure the current pill reference is defined before accessing its classList
  if (pillRef) {
    const itemClassList = pillRef.classList;

    if (!itemClassList.contains("rounded-3xl")) {
      itemClassList.add("rounded-3xl");
    }

    // Add back full border (top, bottom, left, right)
    if (!itemClassList.contains("border-l-2")) {
      itemClassList.add("border-l-2");
    }
    if (!itemClassList.contains("border-r-2")) {
      itemClassList.add("border-r-2");
    }
  }
}

    //[STEP 4] handle lone still selected pills that were part of a group
    for (let i = 0; i < selectedLonePills.length; i++) {
      const itemClassList = selectedLonePills[i].classList;
      itemClassList.add("rounded-3xl");

      // add back full border (top bottom left right)
      if (!itemClassList.contains("border-l-2"))
        itemClassList.add("border-l-2");
      if (!itemClassList.contains("border-r-2"))
        itemClassList.add("border-r-2");
    }
  };

  return (
    <div className="h-full">
      <div className="ml-5">
        <div className=" relative w-full">
        {pills.map((pill, index) => (
            (index === 0 || pills[0].selected) && (
              <Pill
                key={index}
                selected={pill.selected}
                title={pill.title}
                left={pill.left}
                onPillClick={onPillClick(index)}
                setRef={(el) => {
                  pillRefs.current[index] = el;
                }}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillContainer;
