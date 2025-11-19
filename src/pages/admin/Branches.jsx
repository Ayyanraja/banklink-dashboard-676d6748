import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, MapPin, Trash2, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Branches = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bankId: "",
    address: "",
    city: "",
    state: ""
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBranches([
        { id: "1", name: "Downtown Branch", bank: "Chase Bank", address: "123 Main St", city: "New York", state: "NY" },
        { id: "2", name: "Airport Branch", bank: "Bank of America", address: "456 Airport Rd", city: "Los Angeles", state: "CA" },
        { id: "3", name: "Mall Branch", bank: "Wells Fargo", address: "789 Mall Ave", city: "Chicago", state: "IL" },
        { id: "4", name: "University Branch", bank: "Citibank", address: "321 Campus Dr", city: "Boston", state: "MA" }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const branch = {
        id: String(branches.length + 1),
        name: formData.name,
        bank: "Chase Bank", // In real app, this would be looked up from bankId
        address: formData.address,
        city: formData.city,
        state: formData.state
      };
      setBranches([...branches, branch]);
      toast({
        title: "Branch created!",
        description: `${formData.name} has been added successfully.`,
      });
      setDialogOpen(false);
      setFormData({ name: "", bankId: "", address: "", city: "", state: "" });
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (branchId) => {
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
                Add a new branch location to a bank
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Branch Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Downtown Branch"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankId">Bank</Label>
                <Select value={formData.bankId} onValueChange={(value) => setFormData({...formData, bankId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Chase Bank</SelectItem>
                    <SelectItem value="2">Bank of America</SelectItem>
                    <SelectItem value="3">Wells Fargo</SelectItem>
                    <SelectItem value="4">Citibank</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Branch"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branches Table */}
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
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {branch.name}
                    </div>
                  </TableCell>
                  <TableCell>{branch.bank}</TableCell>
                  <TableCell>{branch.address}</TableCell>
                  <TableCell>{branch.city}</TableCell>
                  <TableCell>{branch.state}</TableCell>
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
              <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
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
