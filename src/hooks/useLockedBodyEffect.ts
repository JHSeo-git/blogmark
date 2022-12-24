import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useLockedBodyEffect(hidden = false) {
  useIsomorphicLayoutEffect(() => {
    if (hidden) {
      document.body.style.overflow = 'hidden';
      // document.body.style.overscrollBehavior = "content";
      // document.body.style.position = "relative";
      // document.body.style.paddingLeft = "0";
      // document.body.style.paddingRight = "0";
      // document.body.style.paddingTop = "0";
      // document.body.style.marginLeft = "0";
      // document.body.style.marginRight = "0";
      // document.body.style.marginTop = "0";
    }

    return () => {
      document.body.style.overflow = '';
      // document.body.style.overscrollBehavior = "";
      // document.body.style.position = "";
      // document.body.style.paddingLeft = "";
      // document.body.style.paddingRight = "";
      // document.body.style.paddingTop = "";
      // document.body.style.marginLeft = "";
      // document.body.style.marginRight = "";
      // document.body.style.marginTop = "";
    };
  }, [hidden]);
}
