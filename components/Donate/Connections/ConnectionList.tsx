export interface ChainTitleType {
  imgClassName?: string | undefined;
  title: string | "";
  logoSrc: string | "";
}

const ChainTitle = ({ logoSrc, title, imgClassName }: ChainTitleType) => {
  return (
    <li className="list-group-item px-rem-4 py-rem-3 border-bottom-0 bg-light text-start mt-rem-8">
      <img
        width={32}
        height={32}
        className={imgClassName}
        src={logoSrc}
        alt={`${title} logo`}
      />
      <span className="ml-rem-4">{title}</span>
    </li>
  );
};

const ConnectionList = ({ children }) => {
  return <ul className="list-group">{children}</ul>;
};

export interface ConnectionItemType {
  onClick: any;
  imageClassName?: string;
  title: string;
  logo: string;
}

const ConnectionItem = ({ onClick, title, logo }: ConnectionItemType) => {
  return (
    <li className="list-group-item">
      <button
        onClick={onClick}
        className="w-100 btn btn-outline-dark text-start px-rem-4"
      >
        <img width={32} height={32} src={logo} alt={`${title} logo`} />
        <span className="ml-rem-4">{title}</span>
      </button>
    </li>
  );
};

export { ConnectionList, ConnectionItem, ChainTitle };
