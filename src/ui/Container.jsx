function Container({ children, classNames = "" }) {
  return (
    <div className={`xlCustom:container mx-auto px-4 ${classNames}`}>
      {children}
    </div>
  );
}

export default Container;
