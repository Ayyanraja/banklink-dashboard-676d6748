import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, CreditCard, DollarSign, Building, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Account {
  id: string;
  accountNumber: string;
  bankName: string;
  accountType: string;
  balance: number;
  status: string;
}

const Accounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountNumber: "",
    bankName: "",
    accountType: "checking",
    initialBalance: ""
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAccounts([
        {
          id: "1",
          accountNumber: "****1234",
          bankName: "Chase Bank",
          accountType: "Checking",
          balance: 5420.50,
          status: "active"
        },
        {
          id: "2",
          accountNumber: "****5678",
          bankName: "Bank of America",
          accountType: "Savings",
          balance: 12800.00,
          status: "active"
        },
        {
          id: "3",
          accountNumber: "****9012",
          bankName: "Wells Fargo",
          accountType: "Checking",
          balance: 3150.75,
          status: "active"
        }
      ]);
      setLoading(false);
    }, 500);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const account: Account = {
        id: String(accounts.length + 1),
        accountNumber: `****${newAccount.accountNumber.slice(-4)}`,
        bankName: newAccount.bankName,
        accountType: newAccount.accountType,
        balance: parseFloat(newAccount.initialBalance),
        status: "active"
      };
      setAccounts([...accounts, account]);
      toast({
        title: "Account created!",
        description: "Your new account has been added successfully.",
      });
      setDialogOpen(false);
      setNewAccount({ accountNumber: "", bankName: "", accountType: "checking", initialBalance: "" });
      setLoading(false);
    }, 1000);
  };

  const handleCloseAccount = (accountId: string) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
    toast({
      title: "Account closed",
      description: "The account has been closed successfully.",
    });
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

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
              <DialogTitle>Create New Account</DialogTitle>
              <DialogDescription>
                Connect a new bank account to your BankAgg profile
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="e.g., Chase Bank"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({...newAccount, bankName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  value={newAccount.accountType}
                  onValueChange={(value) => setNewAccount({...newAccount, accountType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialBalance">Initial Balance</Label>
                <Input
                  id="initialBalance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newAccount.initialBalance}
                  onChange={(e) => setNewAccount({...newAccount, initialBalance: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-3xl font-bold">${getTotalBalance().toFixed(2)}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.bankName}</CardTitle>
                    <CardDescription>{account.accountNumber}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCloseAccount(account.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <Badge variant="secondary">{account.accountType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="text-xl font-bold">${account.balance.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-success">{account.status}</Badge>
                </div>
              </div>
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
              Get started by adding your first bank account
            </p>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Account
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Accounts;
