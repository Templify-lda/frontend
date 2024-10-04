import type ICard from "./card";
import type IVariable from "./variable";

export default interface ITemplate {
  id: string;
  name: string;
  variables: Map<string, IVariable>;
  child: Map<string, ICard>;
}
