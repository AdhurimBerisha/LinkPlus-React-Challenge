import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "./ui/card";

import { fetchUsers } from "@/store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import type { User } from "@/types/User";
import { Button } from "./ui/button";
import { Search, Plus, ArrowUpDown } from "lucide-react";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "company" | "">("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filterUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const sortUsers = useMemo(() => {
    if (!sortBy) return filterUsers;

    const sorted = [...filterUsers].sort((a, b) => {
      let compare = 0;
      if (sortBy === "name") compare = a.name.localeCompare(b.name);
      if (sortBy === "email") compare = a.email.localeCompare(b.email);
      if (sortBy === "company")
        compare = a.company.name.localeCompare(b.company.name);
      return sortAsc ? compare : -compare;
    });
    return sorted;
  }, [filterUsers, sortBy, sortAsc]);

  const handleSort = (field: "name" | "email" | "company") => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortAsc(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <div className="text-red-600 text-xl mb-2">⚠️ Error</div>
              <p className="text-red-700 mb-4">{error}</p>
              <Button
                onClick={() => dispatch(fetchUsers())}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-black/70 bg-clip-text ">
            Users Directory
          </h1>
          <p className="text-black/70 text-sm sm:text-base">
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-white/90 transition-all duration-200 text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          size="sm"
          onClick={() => handleSort("name")}
          className="flex items-center gap-2 cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Name
        </Button>
        <Button
          size="sm"
          onClick={() => handleSort("email")}
          className="flex items-center cursor-pointer gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Email
        </Button>
        <Button
          onClick={() => handleSort("company")}
          size="sm"
          className="flex items-center gap-2 cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span> Company
        </Button>
        <Button
          size="sm"
          onClick={resetFilters}
          className="flex items-center gap-2 cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200"
        >
          Reset Filters
        </Button>
      </div>

      {sortUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white text-lg">
            No users found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortUsers.map((user) => (
            <Card
              key={user.id}
              className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-gray-900 truncate  transition-colors">
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
                        className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-200 bg-blue-50  "
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
      )}
    </div>
  );
};

export default UserList;
