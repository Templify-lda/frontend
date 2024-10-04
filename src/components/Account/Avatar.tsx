import AvatarIcon from "./AvatarIcon";

interface IShortProps {
  image: string;
  accountName: string;
}

interface IExpandedProps {
  image: string;
  accountName: string;
  currentPlan: string;
  nameStyle: string;
  planStyle: string;
}

const Short = ({ image, accountName }: IShortProps) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg">
      <p className="text-lg font-semibold text-rich-black m-0">{accountName}</p>
      <AvatarIcon name={accountName} avatarImage={image} />
    </div>
  );
};

const Expanded = ({
  image,
  accountName,
  currentPlan,
  nameStyle,
  planStyle,
}: IExpandedProps) => {
  return (
    <div className="flex items-center gap-4 rounded-lg">
      <div className="flex flex-col justify-center items-end">
        <p className={`font-semibold m-0 ${nameStyle}`}>{accountName}</p>
        <p className={`text-xs ${planStyle}`}>{currentPlan}</p>
      </div>
      <AvatarIcon name={accountName} avatarImage={image} />
    </div>
  );
};

export default {
  Short,
  Expanded,
};
