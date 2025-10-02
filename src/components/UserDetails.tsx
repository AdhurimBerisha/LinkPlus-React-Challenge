import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building } from "lucide-react";
import type { User } from "@/types/User";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import type { RootState } from "../store/store";
import { fetchUsers } from "@/store/slices/usersSlice";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { users: usersInStore, loading } = useSelector(
    (state: RootState) => state.users
  );
  const user = usersInStore.find((u) => u.id === Number(id));

  useEffect(() => {
    const loadUser = async () => {
      if (usersInStore.length === 0) {
        await dispatch(fetchUsers());
      }

      if (!user && id) {
        try {
          const response = await axios.get<User>(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );

          console.log("User found in API:", response.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
    };

    loadUser();
  }, [id, user, dispatch, usersInStore.length]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-8 text-center">User not found</div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Link to="/">
          <Button
            size="sm"
            className="flex items-center cursor-pointer gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to</span> Users
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-black/70 bg-clip-text ">
            {user.name}
          </h1>
          <p className="text-black/70 text-sm sm:text-base mt-1">
            @{user.username}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <Mail className="h-5 w-5 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Email</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Phone</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Globe className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">Website</p>
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-1 block"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <MapPin className="h-5 w-5 text-green-600" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Street</p>
              <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                {user.address.street}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">City</p>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                  {user.address.city}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Zipcode
                </p>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                  {user.address.zipcode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mr-10 ml-10">
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <Building className="h-5 w-5 text-purple-600" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </p>
              <p className="text-base font-medium text-gray-900 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                {user.company.name}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
