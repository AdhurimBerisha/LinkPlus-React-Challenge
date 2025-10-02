import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { editUser } from "@/store/slices/usersSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { User } from "@/types/User";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowLeft,
  User as UserIcon,
  Phone,
  Building,
  MapPin,
} from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  const [formData, setFormData] = useState<User | null>(user || null);

  if (!formData) {
    return <div className="p-4">User not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              [parent]: {
                ...(prev[parent as keyof User] as object),
                [child]: value,
              },
            }
          : prev
      );
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      dispatch(editUser(formData));
      navigate(`/user/${formData.id}`);
    }
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
            Edit User
          </h1>
          <p className="text-white text-sm sm:text-base mt-1">
            Update user profile information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <UserIcon className="h-5 w-5 text-blue-600" />
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
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
                  name="company.name"
                  value={formData.company.name}
                  onChange={handleChange}
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
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
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
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
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
                    name="address.zipcode"
                    value={formData.address.zipcode}
                    onChange={handleChange}
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
            className="w-full sm:w-auto flex items-center cursor-pointer justify-center gap-2 bg-white/70 text-black backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
          >
            <UserIcon className="h-4 w-4" />
            Update User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
