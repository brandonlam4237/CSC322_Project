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
  partsListIds:IPartsListIds;
  buildForm: IBuildForm;
  setPartsList: (value: IPartsList) => void;
  setPartsListIds: (value: IPartsListIds) => void;
  setBuildForm: (value: IBuildForm) => void;
  removePart: (value: IPart) => void;
  addPart: (value: IPart) => void;
  discardBuild: () => void;
}

export interface IPartsList {
  /* enclosing CPU and denoting its type as string prevents implicit type
  any on keys error when using a string to access as a key to access the object */
  [key: string]: IPart;
  CPU: IPart;
  Cooling: IPart;
  Motherboard: IPart;
  RAM: IPart;
  Storage: IPart;
  GPU: IPart;
  PSU: IPart;
  Case: IPart;
}

export interface IPart {
  id: number;
  component_name: string;
  product_name: string;
  image_url: string;
  price: number;
  isAdded: Boolean;
}

export const partTemplate: IPart = {
  id: -1,
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

export const partsListIdsTemplate: IPartsListIds = {
  CPU: -1,
  Cooling: -1,
  Motherboard: -1,
  RAM: -1,
  Storage: -1,
  GPU: -1,
  PSU: -1,
  Case: -1,
};

export interface IBuildForm {
  [key: string]: string | number;
  build_description: string;
  build_name: string;
}

export interface IPartsListIds {
  [key:string]:number
}

export const PartsListContext = createContext<IPartsListContext>({
  partsList: partsListTemplate,
  partsListIds:partsListIdsTemplate,
  buildForm: {
    build_description: "",
    build_name: "",
  },
  setPartsList: (value: IPartsList) => {
    /* do nothing */
  },
  setPartsListIds: (value:IPartsListIds) => {
    /* do nothing */
  },
  setBuildForm: (value: IBuildForm) => {
    /* do nothing */
  },
  removePart: (value: IPart) => {
    /* do nothing */
  },
  addPart: (value: IPart) => {
    /* do nothing */
  },
  discardBuild: () => {
    /* */
  },
});

export function usePartsListContext() {
  return useContext(PartsListContext);
}

interface PartsListProvidorProps {
  children?: ReactNode;
}

export function PartsListProvidor({ children }: PartsListProvidorProps) {
  // for displaying part picker table
  const [partsList, setPartsList] = useState<IPartsList>(partsListTemplate);
  // for validating a build
  const [partsListIds, setPartsListIds] = useState<IPartsListIds>({});
  // for buying and suggesting a build
  const [buildForm, setBuildForm] = useState<IBuildForm>({
    build_description: "temp",
    build_name: "temp",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  function discardBuild() {
    setPartsList(partsListTemplate);
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
    setIsLoading(false);
  }, []);

  /* Update browser local storage when a new part has been 
    added/removed from partsList state variable */
  useEffect(() => {
    // don't update local storage before checking if partsList is in there
    if (isLoading == false) {
      localStorage.setItem(PARTS_LIST_KEY, JSON.stringify(partsList));

      // update buildForm that will be sent to backend
      const formattedPartsList = formatPartsList(partsList);
      // update both Ids object 
      setPartsListIds(formattedPartsList)
      // update build form build form but  keep build_description and name constant
      setBuildForm({
        ...formattedPartsList,
        build_description: buildForm.build_description,
        build_name: buildForm.build_name,
      });
    }
  }, [partsList]);

  function formatPartsList(partsList: IPartsList): { [key: string]: number } {
    let componentNamesArray = Object.keys(partsList); //get the keys as an array
    // accumulate an object containing only the Id(s) while ignoring any with a value of -1
    let formattedParts = componentNamesArray.reduce<{ [key: string]: number }>(
      (acc, key) => {
        let id = partsList[key].id;
        if (id != -1) acc[key] = id;
        return acc;
      },
      {}
    );

    return formattedParts;
  }

  const partsListVariables = {
    partsList,
    buildForm,
    partsListIds,
    setPartsList,
    setPartsListIds,
    setBuildForm,
    addPart,
    removePart,
    discardBuild,
  };

  return (
    <PartsListContext.Provider value={partsListVariables}>
      {children}
    </PartsListContext.Provider>
  );
}
