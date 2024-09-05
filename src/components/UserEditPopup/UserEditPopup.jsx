'use client';

import domainName from "@/domainName";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const UserEditPopup = ({ children, userId }) => {

    const server = domainName();

    const [passwordPopup, setPasswordPopup] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [newPasswordUpdateSucccess, setNewPasswordUpdateSuccess] = useState('');

    const [user, setUser] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState('');

    useEffect(() => {
        axios.post(`${server}/users/get-one`, { userId })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [userId, server])

    function enterUserValue(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function submitChanges(e) {
        e.preventDefault()
        axios.post(`${server}/users/update-one`, user)
            .then((res) => {
                setSubmitSuccess(res.data);
                setTimeout(() => setSubmitSuccess(''), 5000);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function resetPasswordSubmit(e) {
        e.preventDefault();
        axios.post(`${server}/users/update-password`, { updatedPassword, userId: user._id })
            .then((res) => {
                setNewPasswordUpdateSuccess(res.data);
                setTimeout(() => setNewPasswordUpdateSuccess(''), 5000);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="bg-white flex flex-col gap-2 p-4 drop-shadow-2xl border border-slate-300 rounded-md max-w-md w-full">
            {children}
            <div>
                <form className="flex flex-col gap-2" onSubmit={submitChanges}>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col grow">
                            <label className="text-sm font-semibold">Username</label>
                            <input
                                name="username"
                                required
                                value={user.username}
                                onChange={enterUserValue}
                                type="text" disabled className="text-sm py-2 px-3 border-0 rounded-md bg-slate-300" />
                        </div>
                        <div className="flex flex-col grow">
                            <label className="text-sm font-semibold">Name</label>
                            <input
                                name="name"
                                required
                                value={user.name}
                                onChange={enterUserValue}
                                type="text" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
                        </div>
                        <div className="flex flex-col grow">
                            <label className="text-sm font-semibold">Email Address</label>
                            <input
                                name="email"
                                required
                                value={user.email}
                                onChange={enterUserValue}
                                type="email" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
                        </div>
                        <div className="flex flex-col grow">
                            <label className="text-sm font-semibold">Role</label>
                            <select name="role" required value={user.role} onChange={enterUserValue}
                                className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md">
                                <option value="manager">Manager</option>
                                <option value="approver">Approver</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="flex flex-col grow items-start">
                            <button
                                onClick={() => setPasswordPopup(true)}
                                type="button" className="text-sm py-2 px-3 bg-red-500 text-white font-semibold rounded-sm">Reset Password</button>
                        </div>
                        <button
                            type="submit"
                            className="text-sm font-semibold py-2 px-3 bg-blue-500 rounded-md shadow-md shadow-blue-600 text-white"
                        >Save Changes</button>
                    </div>
                    {
                        submitSuccess &&
                        <div>
                            <p className="text-sm font-semibold py-2 px-3 rounded-md text-green-500 bg-green-100">{submitSuccess}</p>
                        </div>
                    }
                </form>
            </div>

            {/* Password Reset Popup */}
            {
                passwordPopup &&
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="bg-white p-3 border border-black rounded-md">
                        <form onSubmit={resetPasswordSubmit} className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <label>Reset Password</label>
                                <div className="border border-blue-600 rounded-md overflow-hidden px-3">
                                    <input
                                        className="text-sm border outline-none py-2"
                                        value={updatedPassword}
                                        onChange={(e) => setUpdatedPassword(e.target.value)}
                                        type={passwordVisible ? "text" : "password"} name="resetPassword" />
                                    <FontAwesomeIcon
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        icon={passwordVisible ? faEyeSlash : faEye} width={'20px'} className="text-blue-500 cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex flex-nowrap justify-between">
                                <button
                                    onClick={() => setPasswordPopup(false)}
                                    className="text-sm font-semibold py-2 px-3 rounded-md text-red-500">Close</button>
                                <button type="submit" className="text-sm font-semibold py-2 px-3 bg-blue-500 rounded-md text-white">Update</button>
                            </div>
                            {
                                newPasswordUpdateSucccess &&
                                <div>
                                    <p className="text-sm font-semibold py-2 px-3 rounded-md text-green-500 bg-green-100">{newPasswordUpdateSucccess}</p>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserEditPopup
