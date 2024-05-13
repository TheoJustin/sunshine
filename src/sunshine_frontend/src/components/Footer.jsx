import React from "react";
import { FaDiscord, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import Logo from "../../../../assets/Logo_Sunshine-removebg.png";

export default function Footer() {
    return (
        <>
            <footer className="rounded-lg shadow" style={{ backgroundColor: "#1b2f2e" }}>
                <div className="w-full pl-16 pr-16 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href={Logo} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={Logo} className="h-16" alt="Sunshine Logo" />
                            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white font-sans">Sunshine</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-white sm:mb-0">
                            <li className="mr-6">
                                <a href="https://discord.com/users/31709445408948225" className="hover:text-blue-300 transition-colors duration-300">
                                    <FaDiscord size="2em" />
                                </a>
                            </li>
                            <li className="mr-6">
                                <a href="https://t.me/theojustin" className="hover:text-sky-300 transition-colors duration-300">
                                    <FaTelegramPlane size="2em" />
                                </a>
                            </li>
                            <li className="mr-6">
                                <a href="https://instagram.com/theojustin_" className="hover:text-pink-300 transition-colors duration-300">
                                    <FaInstagram size="2em" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-300 sm:mx-auto" />
                    <span className="block text-lg text-white sm:text-center font-sans">© 2023 <a href="" className="hover:underline">Sunshine™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    );
}
