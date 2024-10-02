import type ICard from "./card";

export default interface ITemplate{
  id: string,
  name: string,
  variables: Map<string, string>,
  child: Map<string, ICard>,
}