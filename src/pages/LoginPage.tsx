"use client"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CustomerSupport from "../components/CustomerSupport"
import { useState } from "react"
import { Link } from "react-router-dom"
import { RefreshCw } from "lucide-react"
export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        captcha: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login submission
        console.log("Login submitted:", formData)
    }
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="container mx-auto py-16">
                <div className="flex-1 flex flex-col">
                    <div className="container mx-auto py-8 flex-1 flex flex-col">
                        <div className="max-w-md mx-auto w-full">
                            <h1 className="text-4xl font-bold text-center text-red-600 mb-8 relative">
                                Đăng nhập
                                <span className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800"></span>
                            </h1>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Mật khẩu <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                <div className="flex items-start">
                                    <div className="w-full">
                                        <input
                                            id="captcha"
                                            name="captcha"
                                            type="text"
                                            placeholder="Nhập mã xác nhận"
                                            required
                                            value={formData.captcha}
                                            onChange={handleChange}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                        />
                                        <button
                                            type="button"
                                            className="mt-1 text-gray-600 hover:text-gray-900 text-sm flex items-center"
                                            onClick={() => console.log("Change CAPTCHA")}
                                        >
                                            <RefreshCw className="w-3 h-3 mr-1" />
                                            Đổi mã khác
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <Link to="/quen-mat-khau" className="text-gray-600 hover:text-red-600">
                                    Quên mật khẩu?
                                </Link>
                                <span className="mx-2">|</span>
                                <span className="text-gray-600">
                                    Bạn chưa có tài khoản?
                                    <Link to="/dang-ky" className="ml-1 text-gray-600 hover:text-red-600">
                                        Đăng ký ngay
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <CustomerSupport />
                </div>
            </div>
            <Footer />
        </main>
    )
}
