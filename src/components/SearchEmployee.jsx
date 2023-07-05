import React, { useEffect, useState } from "react";

const handleSearch = (employees, searchQuery) => {
    return employees.filter((e) => {
        return (
            (e.firstname
                .toLowerCase()
                .includes(searchQuery.name.toLowerCase()) ||
                e.lastname
                    .toLowerCase()
                    .includes(searchQuery.name.toLowerCase())) &&
            (searchQuery.mobile.length === 0
                ? true
                : e.mobile == searchQuery.mobile)
        );
    });
};

const SearchEmployee = () => {
    let i = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        name: "",
        mobile: "",
    });

    const handleDelete = async (id) => {
        const response = await fetch(`/home/employee/${id}`, {
            method: "DELETE",
        });
    };

    const itemsPerPage = 10;

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const fetchEmployee = async () => {
        try {
            const response = await fetch("/home/employee/search");
            const employees = await response.json();
            setEmployees(employees);
            setFilteredEmployees(employees);
            console.log(employees[0]);
        } catch (err) {
            console.error("Failed to fetch employees ", err);
        }
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPageData(filteredEmployees.slice(startIndex, endIndex));
    }, [currentPage, filteredEmployees]);

    useEffect(() => {
        fetchEmployee();
    }, []);

    return (
        <section className="search">
            {" "}
            <h3>Search Employee</h3>
            <div className="search__container">
                <div className="search__form">
                    <label>
                        Name
                        <input
                            type="text"
                            value={searchQuery.name}
                            onChange={(e) => {
                                setSearchQuery((prevSearchQuery) => ({
                                    name: e.target.value,
                                    mobile: prevSearchQuery.mobile,
                                }));
                            }}
                        ></input>
                    </label>
                    <label>
                        Mobile No
                        <input
                            type="number"
                            value={searchQuery.mobile}
                            onChange={(e) => {
                                setSearchQuery((prevSearchQuery) => ({
                                    name: prevSearchQuery.name,
                                    mobile: e.target.value,
                                }));
                            }}
                        ></input>
                    </label>
                    <div>
                        <button
                            className="search__btn btn"
                            onClick={() => {
                                const data = handleSearch(
                                    employees,
                                    searchQuery
                                );
                                setCurrentPage(1);
                                setFilteredEmployees(data);
                            }}
                        >
                            Search
                        </button>
                        <button
                            className="clear-btn btn"
                            onClick={() => {
                                setSearchQuery({ name: "", mobile: "" });
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <table className="search__table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Birthdate</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.country}</td>
                                <td>{employee.city}</td>
                                <td>
                                    <button
                                        className="search__edit-btn btn"
                                        // onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="search__delete-btn btn"
                                        onClick={() =>
                                            handleDelete(employee._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button disabled={currentPage === 1} onClick={previousPage}>
                        Previous Page
                    </button>
                    <button
                        disabled={
                            currentPage ===
                            Math.ceil(filteredEmployees.length / itemsPerPage)
                        }
                        onClick={nextPage}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SearchEmployee;
