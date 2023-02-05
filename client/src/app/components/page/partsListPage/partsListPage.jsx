// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { paginate } from "../../../utils/paginate";
// import Pagination from "../../common/pagination";
// import GroupList from "../../common/groupList";
// import SearchStatus from "../../ui/searchStatus";
// import UserTable from "../../ui/usersTable";
// import _ from "lodash";
// import { useProfessions } from "../../../hooks/useProfession";
// import { useAuth } from "../../../hooks/useAuth";
// import { useUser } from "../../../hooks/useUsers";
// const ProductsListPage = () => {
//     const { users } = useUser();
//     const { currentUser } = useAuth();
//     const { isLoading: professionsLoading, professions } = useProfessions();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedProf, setSelectedProf] = useState();
//     const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
//     const pageSize = 8;

//     const handleToggleBookMark = (id) => {
//         const newArray = users.map((user) => {
//             if (user._id === id) {
//                 return { ...user, bookmark: !user.bookmark };
//             }
//             return user;
//         });
//     };

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedProf, searchQuery]);

//     const handleProfessionSelect = (item) => {
//         if (searchQuery !== "") setSearchQuery("");
//         setSelectedProf(item);
//     };
//     const handleSearchQuery = ({ target }) => {
//         setSelectedProf(undefined);
//         setSearchQuery(target.value);
//     };

//     const handlePageChange = (pageIndex) => {
//         setCurrentPage(pageIndex);
//     };
//     const handleSort = (item) => {
//         setSortBy(item);
//     };

//     // if (users) {
//     function filterUsers(data) {
//         const filteredUsers = searchQuery
//             ? data.filter(
//                   (user) =>
//                       user.name
//                           .toLowerCase()
//                           .indexOf(searchQuery.toLowerCase()) !== -1
//               )
//             : selectedProf
//             ? data.filter(
//                   (user) =>
//                       JSON.stringify(user.profession) ===
//                       JSON.stringify(selectedProf)
//               )
//             : data;
//         return filteredUsers.filter((u) => u._id !== currentUser._id);
//     }
//     const filteredUsers = filterUsers(users);
//     const count = filteredUsers.length;
//     const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
//     const usersCrop = paginate(sortedUsers, currentPage, pageSize);
//     const clearFilter = () => {
//         setSelectedProf();
//     };

//     return (
//         <div className="d-flex">
//             {professions && !professionsLoading && (
//                 <div className="d-flex flex-column flex-shrink-0 p-3">
//                     <GroupList
//                         selectedItem={selectedProf}
//                         items={professions}
//                         onItemSelect={handleProfessionSelect}
//                     />
//                     <button
//                         className="btn btn-secondary mt-2"
//                         onClick={clearFilter}
//                     >
//                         {" "}
//                         Очистить
//                     </button>
//                 </div>
//             )}
//             <div className="d-flex flex-column">
//                 <SearchStatus length={count} />
//                 <input
//                     type="text"
//                     name="searchQuery"
//                     placeholder="Search..."
//                     onChange={handleSearchQuery}
//                     value={searchQuery}
//                 />
//                 {count > 0 && (
//                     <UserTable
//                         users={usersCrop}
//                         onSort={handleSort}
//                         selectedSort={sortBy}
//                         onDelete={handleDelete}
//                         onToggleBookMark={handleToggleBookMark}
//                     />
//                 )}
//                 <div className="d-flex justify-content-center">
//                     <Pagination
//                         itemsCount={count}
//                         pageSize={pageSize}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
// //     return "loading...";
// // };
// ProductsListPage.propTypes = {
//     products: PropTypes.array
// };

// export default ProductsListPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getParts,
    getPartsLoadingStatus,
    loadPartsList
} from "../../../store/parts";

const PartsListPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getPartsLoadingStatus());

    const parts = useSelector(getParts());
    useEffect(() => {
        dispatch(loadPartsList());
    }, []);
    if (isLoading) return "Loading...";

    if (Array.isArray(parts)) {
        return (
            <>
                <h1>Магазин</h1>
                <Link to="/add">
                    <button className="btn btn-primary">Добавить</button>
                </Link>
                <h2>
                    В наличии {parts.length}
                    {parts.length > 1 && parts.length < 5
                        ? " товара"
                        : " товаров"}
                </h2>
                <div className="row">
                    {Object.keys(parts).map((p) => (
                        // <div key={products[p].id}>
                        //     <h1>
                        //         {products[p].manufacturer} {products[p].name}
                        //     </h1>
                        //     <img src={products[p].image}></img>
                        //     <p>{products[p].description}</p>
                        //     <p>Цена: {products[p].price} рублей</p>
                        //     <p>
                        //         Наличие:
                        //         {products[p].stock ? " в наличии" : " под заказ"}
                        //     </p>
                        //     <button
                        //         className="btn btn-primary"
                        //         // onClick={handleBusket}
                        //     >
                        //         В корзину
                        //     </button>
                        // </div>

                        <div
                            key={parts[p].id}
                            className={
                                "col-sm-6" +
                                (parts[p].id % 2 !== 0 ? " mb-3 mb-sm-0" : "")
                            }
                        >
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title" height="100px">
                                        {parts[p].manufacturer} {parts[p].name}
                                    </h5>
                                    <img
                                        className="card-img mx-auto"
                                        src={parts[p].image}
                                    ></img>
                                    <p className="card-text">
                                        {parts[p].description.slice(0, 115)}
                                        ...
                                    </p>
                                    <Link
                                        to={`/parts/${parts[p].id}`}
                                        className="btn btn-primary"
                                    >
                                        В корзину
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};

export default PartsListPage;
