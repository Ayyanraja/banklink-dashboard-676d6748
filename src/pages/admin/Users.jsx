import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users as UsersIcon, Mail, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          status: "active",
          createdAt: "2024-01-15",
          accounts: 3
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "user",
          status: "active",
          createdAt: "2024-01-10",
          accounts: 2
        },
        {
          id: "3",
          name: "Admin User",
          email: "admin@bankagg.com",
          role: "admin",
          status: "active",
          createdAt: "2024-01-01",
          accounts: 0
        },
        {
          id: "4",
          name: "Mike Johnson",
          email: "mike@example.com",
          role: "user",
          status: "active",
          createdAt: "2024-01-20",
          accounts: 1
        }
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">View and manage all system users</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-success" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Admin Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-warning" />
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage all registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Accounts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={user.role === "admin" ? "bg-warning" : ""}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.accounts}</TableCell>
                  <TableCell>
                    <Badge className="bg-success">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {user.createdAt}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UsersIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No users found</h3>
              <p className="text-sm text-muted-foreground">
                Users will appear here once they register
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
