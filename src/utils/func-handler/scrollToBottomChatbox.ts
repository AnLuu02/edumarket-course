export const scrollToBottom = (
  scrollAreaRef?: React.RefObject<HTMLDivElement>
) => {
  requestAnimationFrame(() => {
    if (scrollAreaRef && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  });
};
