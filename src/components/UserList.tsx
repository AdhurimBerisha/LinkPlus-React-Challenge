import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "./ui/card";
import { Button } from "./ui/button";
import { Search, Plus, ArrowUpDown } from "lucide-react";
import type { User } from "@/types/User";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white bg-clip-text ">
            Users Directory
          </h1>
          <p className="text-white text-sm sm:text-base">
            Manage and view user information
          </p>
        </div>
        <Link to="/add-user">
          <Button className="flex items-center gap-2  cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white/90 transition-all duration-200 text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Name
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center cursor-pointer gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Company
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    @{user.username}
                  </p>
                </div>
                <CardAction>
                  <Link to={`/user/${user.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-200 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                    >
                      View
                    </Button>
                  </Link>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-gray-600 min-w-fit">
                    Email:
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-gray-600 min-w-fit">
                    Company:
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.company.name}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-gray-600 min-w-fit">
                    Phone:
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.phone}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
