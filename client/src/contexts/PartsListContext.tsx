/*
Will provide the following: 
  1. add/remove part functions
  2. partslist object 
  3. (maybe) add build to cart function (need to wait for Jed on that)
  4. (maybe) check for compatibility function (need to wait for Jed on that)

Should probably do the following: 
  - Need to update local storage upon adding/removing
  - Need to run a useEffect to see if there's anything in local storage
  - Set up interfaces for part object and partlist object (both already in PartsTable component)
*/

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

const PARTS_LIST_KEY = "custom-build-parts-list-object";

export interface IPartsListContext {
  partsList: IPartsList;
  buildDescription: string;
  setPartsList: (value: IPartsList) => void;
  setBuildDescription: (value: string) => void;
  removePart: (value: IPart) => void;
  addPart: (value: IPart) => void;
  discardBuild:()=>void;
}

export interface IPartsList {
  /* enclosing CPU and denoting its type as string prevents implicit type
  any on keys error when using a string to access as a key to access the object */
  [key: string]: IPart;
  CPU:IPart;
  Cooling: IPart;
  Motherboard: IPart;
  RAM: IPart;
  Storage: IPart;
  GPU: IPart;
  PSU: IPart;
  Case: IPart;
}

export interface IPart {
  component_name: string;
  product_name: string;
  image_url: string;
  price: number;
  isAdded: Boolean;
}

export const partTemplate: IPart = {
  component_name: "",
  product_name: "",
  image_url: "",
  price: -1,
  isAdded: false,
};

export const partsListTemplate: IPartsList = {
  CPU: partTemplate,
  Cooling: partTemplate,
  Motherboard: partTemplate,
  RAM: partTemplate,
  Storage: partTemplate,
  GPU: partTemplate,
  PSU: partTemplate,
  Case: partTemplate,
};

export const PartsListContext = createContext<IPartsListContext>({
  partsList: partsListTemplate,
  buildDescription:"",
  setPartsList: (value: IPartsList) => {
    /* do nothing */
  },
  setBuildDescription: (value: string) =>{
    /* do nothing */
  },
  removePart: (value: IPart) => {
    /* do nothing */
  },
  addPart: (value: IPart) => {
    /* do nothing */
  },
  discardBuild:()=>{
    /* */
  }
});

export function usePartsListContext() {
  return useContext(PartsListContext);
}

interface PartsListProvidorProps {
  children?: ReactNode;
}

export function PartsListProvidor({ children }: PartsListProvidorProps) {
  const [partsList, setPartsList] = useState<IPartsList>(partsListTemplate);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buildDescription, setBuildDescription] = useState<string>("");

  // functions
  function removePart(part: IPart) {
    const componentToRemove: string = part.component_name;
    setPartsList({
      ...partsList,
      [componentToRemove]: partTemplate,
    });
  }

  function addPart(part: IPart) {
    const componentToAdd: string = part.component_name;
    setPartsList({
      ...partsList,
      [componentToAdd]: part,
    });
  }

  function discardBuild(){
    setPartsList(partsListTemplate)
  }
  /* automatically check local storage for partsList object 
    upon mounting of PartsListProvidor */

  useEffect(() => {
    function isString(value: any): value is string {
      return typeof value === "string";
    }
    const storagePartsList = localStorage.getItem(PARTS_LIST_KEY);
    // update state variable if there's a parts list in local storage
    if (isString(storagePartsList)) {
      setPartsList(JSON.parse(storagePartsList));
    }
    setIsLoading(false)
  }, []);

  /* Update browser local storage when a new part has been 
    added/removed from partsList state variable */
  useEffect(() => {
    // don't update local storage before checking if a partsList is in there
    if (isLoading == false) {
      localStorage.setItem(PARTS_LIST_KEY, JSON.stringify(partsList));
    }
  }, [partsList]);

  const partsListVariables = {
    partsList,
    buildDescription,
    setPartsList,
    setBuildDescription,
    addPart,
    removePart,
    discardBuild
  };

  return (
    <PartsListContext.Provider value={partsListVariables}>
      {children}
    </PartsListContext.Provider>
  );
}
