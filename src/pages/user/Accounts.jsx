import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Accounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountType: "savings",
    balance: ""
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAccounts([
        { id: "1", accountNumber: "****1234", bankName: "Chase Bank", accountType: "Checking", balance: 5420.50, status: "active" },
        { id: "2", accountNumber: "****5678", bankName: "Bank of America", accountType: "Savings", balance: 12350.75, status: "active" },
        { id: "3", accountNumber: "****9012", bankName: "Wells Fargo", accountType: "Checking", balance: 3250.00, status: "active" }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newAccount = {
        id: String(accounts.length + 1),
        accountNumber: `****${formData.accountNumber.slice(-4)}`,
        bankName: formData.bankName,
        accountType: formData.accountType.charAt(0).toUpperCase() + formData.accountType.slice(1),
        balance: parseFloat(formData.balance),
        status: "active"
      };
      setAccounts([...accounts, newAccount]);
      toast({
        title: "Account added!",
        description: "Your bank account has been connected successfully.",
      });
      setDialogOpen(false);
      setFormData({ accountNumber: "", bankName: "", accountType: "savings", balance: "" });
      setLoading(false);
    }, 1000);
  };

  const handleCloseAccount = (accountId) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
    toast({
      title: "Account closed",
      description: "The account has been removed from your dashboard.",
    });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Accounts</h1>
          <p className="text-muted-foreground">Manage your connected bank accounts</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Bank Account</DialogTitle>
              <DialogDescription>
                Add a new bank account to your dashboard
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., Chase Bank"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => setFormData({...formData, accountType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="checking">Checking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Initial Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding..." : "Add Account"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total Balance Card */}
      <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
          </div>
          <TrendingUp className="h-12 w-12 text-primary" />
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CreditCard className="h-8 w-8 text-primary" />
                <Badge className="bg-success">{account.status}</Badge>
              </div>
              <CardTitle className="mt-4">{account.bankName}</CardTitle>
              <CardDescription>{account.accountNumber}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Account Type</p>
                <p className="font-medium">{account.accountType}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold text-primary">${account.balance.toFixed(2)}</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleCloseAccount(account.id)}
              >
                Close Account
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No accounts yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get started by connecting your first bank account
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Account
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Accounts;
