import React from "react";
import { useParams } from "react-router-dom";
import PartPage from "../components/page/partPage";
import PartsListPage from "../components/page/partsListPage";
// import UsersLoader from "../components/ui/hoc/usersLoader";

const Parts = () => {
    const params = useParams();
    const { partId } = params;
    return (
        <>
            {partId ? (
                <PartPage partId={partId} />
            ) : (
                <div className="container mt-5">
                    <PartsListPage />
                </div>
            )}
        </>
    );
};

export default Parts;
