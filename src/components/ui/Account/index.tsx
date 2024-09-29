import styles from "./css/style.module.css";
import AccountIcon from "./../AccountIcon";

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
    <div className={styles.shortContainer}>
      <p className={styles.shortAccountName}>{accountName}</p>
      <AccountIcon name={accountName} avatarImage={image} />
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
    <div className={styles.expandedContainer}>
      <div className={styles.accountInfo}>
        <p className={`${styles.expandedAccountName} ${nameStyle}`}>
          {accountName}
        </p>
        <p className={`${styles.expandedLocation} ${planStyle}`}>
          {currentPlan}
        </p>
      </div>
      <AccountIcon name={accountName} avatarImage={image} />
    </div>
  );
};

export default {
  Short,
  Expanded,
};
