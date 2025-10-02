import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, User, Phone, Building, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useForm } from "react-hook-form";
import type { NewUser } from "@/types/User";
import { addUser } from "@/store/slices/usersSlice";

const AddUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUser>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      website: "",
      company: { name: "" },
      address: { street: "", city: "", zipcode: "" },
    },
  });

  const onSubmit = (data: NewUser) => {
    const newUser = {
      id: Date.now(),
      ...data,
    };
    dispatch(addUser(newUser));
    reset();
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
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
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
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
                  {...register("username")}
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
                  {...register("phone")}
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
                  {...register("website")}
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
                  {...register("company.name")}
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
                  {...register("address.street")}
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
                    {...register("address.city")}
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
                    {...register("address.zipcode")}
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
