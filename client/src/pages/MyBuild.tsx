import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/mybuild.scss";
import Table from "src/components/Table";

export default function MyBuild() {
  const [isCompatible, setIsCompatible] = useState(true);
  const authValues = useAuthContext();
  const user = authValues.userData;
  const [isLoading, setisLoading] = useState<boolean>(true);

  return (
    <main className="mybuild__component">
      <h1 className="mybuild__component__header">
        <div className="logo__accent-left">{`<`}</div> My Custom Build{" "}
        <div className="logo__accent-right">{`>`}</div>
      </h1>

      <div className="mybuild__component__content">
        {isCompatible ? (
          <p className="compatibility-banner compatible">
            There are no compatibility issues with your build!
          </p>
        ) : (
          <p className="compatibility-banner incompatible">
            There are compatibility issues with your build! Please check: CPU,
            Motherboard
          </p>
        )}
        
        <Table/>
        

        </div>
    </main>
  );
}
