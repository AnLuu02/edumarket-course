import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { BsArrowUp } from "react-icons/bs";

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <BsArrowUp size={16} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
