import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, GitBranch, Trash2, Edit, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Branch {
  id: string;
  name: string;
  bankName: string;
  address: string;
  city: string;
  phone: string;
}

const Branches = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bankName: "Chase Bank",
    address: "",
    city: "",
    phone: ""
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    setTimeout(() => {
      setBranches([
        { 
          id: "1", 
          name: "Main Street Branch", 
          bankName: "Chase Bank", 
          address: "123 Main St", 
          city: "New York",
          phone: "(555) 123-4567"
        },
        { 
          id: "2", 
          name: "Downtown Branch", 
          bankName: "Bank of America", 
          address: "456 Broadway", 
          city: "New York",
          phone: "(555) 234-5678"
        },
        { 
          id: "3", 
          name: "Central Branch", 
          bankName: "Wells Fargo", 
          address: "789 5th Ave", 
          city: "New York",
          phone: "(555) 345-6789"
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const branch: Branch = {
        id: String(branches.length + 1),
        ...formData
      };
      setBranches([...branches, branch]);
      toast({
        title: "Branch created!",
        description: `${formData.name} has been added successfully.`,
      });
      setDialogOpen(false);
      setFormData({ name: "", bankName: "Chase Bank", address: "", city: "", phone: "" });
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (branchId: string) => {
    setBranches(branches.filter(branch => branch.id !== branchId));
    toast({
      title: "Branch deleted",
      description: "The branch has been removed successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Branches Management</h1>
          <p className="text-muted-foreground">Manage bank branches</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Branch</DialogTitle>
              <DialogDescription>
                Add a new bank branch to the system
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank</Label>
                <Select
                  value={formData.bankName}
                  onValueChange={(value) => setFormData({...formData, bankName: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chase Bank">Chase Bank</SelectItem>
                    <SelectItem value="Bank of America">Bank of America</SelectItem>
                    <SelectItem value="Wells Fargo">Wells Fargo</SelectItem>
                    <SelectItem value="Citibank">Citibank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Branch Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Main Street Branch"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City name"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Branch"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Branches</CardTitle>
          <CardDescription>Manage all bank branches in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-primary" />
                      {branch.name}
                    </div>
                  </TableCell>
                  <TableCell>{branch.bankName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {branch.address}, {branch.city}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{branch.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(branch.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {branches.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <GitBranch className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No branches yet</h3>
              <p className="text-sm text-muted-foreground">
                Get started by adding your first branch
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Branches;
