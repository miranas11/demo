import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "male",
        address: "",
        country: "",
        city: "",
        skills: [],
    });

    const handleChange = (e) => {
        if (e.target.name === "skills") {
            if (e.target.checked) {
                setEmployee((prevEmp) => ({
                    ...prevEmp,
                    skills: [...prevEmp.skills, e.target.value],
                }));
            } else {
                setEmployee((prevEmp) => ({
                    ...prevEmp,
                    skills: [
                        prevEmp.skills.filter((s) => s !== e.target.value),
                    ],
                }));
            }
        } else {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/home/employee/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee),
            });
            navigate("/home/employee/search");
        } catch (e) {}
    };

    return [employee, handleChange, handleSubmit];
};
