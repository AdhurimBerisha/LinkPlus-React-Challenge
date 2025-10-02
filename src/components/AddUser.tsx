import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, User, Phone, Building, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import type { NewUser } from "@/types/User";
import { addUser } from "@/store/slices/usersSlice";

const AddUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const INITIAL_FORM_STATE: NewUser = {
    name: "",
    email: "",
    username: "",
    phone: "",
    website: "",
    company: { name: "" },
    address: { street: "", city: "", zipcode: "" },
  };

  const [formData, setFormData] = useState<NewUser>(INITIAL_FORM_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof NewUser] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      ...formData,
    };
    dispatch(addUser(newUser));
    setFormData(INITIAL_FORM_STATE);
    alert("User added successfully");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Link to="/">
          <Button
            size="sm"
            className="flex items-center cursor-pointer gap-2 bg-white/70 text-black backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to</span> Users
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Add New User
          </h1>
          <p className="text-white text-sm sm:text-base mt-1">
            Create a new user profile
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <User className="h-5 w-5 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter username"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <Phone className="h-5 w-5 text-green-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={handleChange}
                  name="website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter website URL"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <Building className="h-5 w-5 text-purple-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="company.name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company.name"
                  value={formData.company.name}
                  onChange={handleChange}
                  name="company.name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter company name"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <MapPin className="h-5 w-5 text-orange-600" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="address.street"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  name="address.street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="address.city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    name="address.city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address.zipcode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Zipcode
                  </label>
                  <input
                    type="text"
                    id="address.zipcode"
                    value={formData.address.zipcode}
                    onChange={handleChange}
                    name="address.zipcode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                    placeholder="Enter zipcode"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-gray-200">
          <Link to="/">
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-full sm:w-auto flex items-center text-black cursor-pointer justify-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
          >
            <User className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
