import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Building, Trash2, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Banks = () => {
  const { toast } = useToast();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    country: ""
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBanks([
        { id: "1", name: "Chase Bank", code: "CHASE", country: "USA", branches: 4800 },
        { id: "2", name: "Bank of America", code: "BOA", country: "USA", branches: 4200 },
        { id: "3", name: "Wells Fargo", code: "WF", country: "USA", branches: 5200 },
        { id: "4", name: "Citibank", code: "CITI", country: "USA", branches: 2600 }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const bank = {
        id: String(banks.length + 1),
        name: formData.name,
        code: formData.code,
        country: formData.country,
        branches: 0
      };
      setBanks([...banks, bank]);
      toast({
        title: "Bank created!",
        description: `${formData.name} has been added successfully.`,
      });
      setDialogOpen(false);
      setFormData({ name: "", code: "", country: "" });
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (bankId) => {
    setBanks(banks.filter(bank => bank.id !== bankId));
    toast({
      title: "Bank deleted",
      description: "The bank has been removed successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banks Management</h1>
          <p className="text-muted-foreground">Manage banking institutions</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Bank
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bank</DialogTitle>
              <DialogDescription>
                Add a new banking institution to the system
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Bank Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Chase Bank"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Bank Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., CHASE"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="e.g., USA"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Bank"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Banks</CardTitle>
          <CardDescription>Manage all banking institutions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Branches</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      {bank.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{bank.code}</TableCell>
                  <TableCell>{bank.country}</TableCell>
                  <TableCell>{bank.branches}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(bank.id)}
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

          {banks.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No banks yet</h3>
              <p className="text-sm text-muted-foreground">
                Get started by adding your first bank
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Banks;
